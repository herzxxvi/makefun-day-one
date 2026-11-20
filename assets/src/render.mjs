// Renders the guide's graphics from their HTML sources with headless Chrome.
//
//   node assets/src/render.mjs              render every graphic in JOBS
//   node assets/src/render.mjs hero x-card  render only the named ones
//
// Environment:
//   CHROME      path to chrome.exe / google-chrome (a common default is tried)
//   FFMPEG      path to ffmpeg, used to shrink the PNGs (optional)
//   RENDER_TMP  folder for Chrome's throwaway profile (default: the OS temp folder)
//
// One Chrome runs at a time, and nothing here needs a network connection.
// The screenshots of make.fun that annotate.html draws on come from capture.mjs.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const assets = resolve(here, '..');

// name -> source file, output file, CSS size, pixel scale, transparent corners
const JOBS = {
  'hero':          { src: 'hero.html',          out: 'hero.png',            w: 846,  h: 380, scale: 2, clear: true },
  'day-one':       { src: 'day-one.html',       out: 'day-one.png',         w: 846,  h: 500, scale: 2, clear: true },
  'entry-anatomy': { src: 'entry-anatomy.html', out: 'entry-anatomy.png',   w: 846,  h: 430, scale: 2, clear: true },
  'x-card':        { src: 'x-card.html',        out: 'social/x-card.png',   w: 1200, h: 675, scale: 1, clear: false },
  'shot-bounties': { src: 'annotate.html?shot=bounties',    out: 'shot-bounties.png',    w: 846, h: 598, scale: 2, clear: true },
  'shot-bounty-page': { src: 'annotate.html?shot=bounty-page', out: 'shot-bounty-page.png', w: 846, h: 558, scale: 2, clear: true },
  'shot-record':   { src: 'annotate.html?shot=record',      out: 'shot-record.png',      w: 846, h: 354, scale: 2, clear: true },
};

function findChrome() {
  const candidates = [
    process.env.CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('Chrome not found. Set CHROME to its path.');
  return found;
}

function slash(p) {
  return p.replace(/\\/g, '/');
}

function shoot({ url, out, w, h, scale, clear, wait }) {
  const profile = join(process.env.RENDER_TMP || tmpdir(), 'day-one-chrome-profile');
  rmSync(profile, { recursive: true, force: true });
  mkdirSync(profile, { recursive: true });
  mkdirSync(dirname(out), { recursive: true });
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    `--user-data-dir=${slash(profile)}`,
    `--window-size=${w},${h}`,
    `--force-device-scale-factor=${scale}`,
    `--screenshot=${slash(out)}`,
  ];
  if (clear) args.push('--default-background-color=00000000');
  if (wait) args.push(`--virtual-time-budget=${wait}`);
  args.push(url);
  const run = spawnSync(findChrome(), args, { stdio: 'pipe', timeout: 120000 });
  rmSync(profile, { recursive: true, force: true });
  if (!existsSync(out)) {
    throw new Error(`No screenshot written for ${url}\n${run.stderr}`);
  }
  if (clear) shrink(out);
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`${slash(out)}  ${w * scale}x${h * scale}  ${kb} KB`);
}

// Rewrites a PNG with a 256-colour palette (transparency kept), which cuts the
// file to about a third. Skipped quietly when ffmpeg is not installed.
function shrink(file) {
  const ffmpeg = [process.env.FFMPEG, 'C:/ffmpeg-bin/ffmpeg.exe', 'ffmpeg'].filter(Boolean)
    .find((p) => p === 'ffmpeg' || existsSync(p));
  const small = `${file}.small.png`;
  const filter = 'split[a][b];[a]palettegen=max_colors=256:reserve_transparent=1:stats_mode=full[p];'
    + '[b][p]paletteuse=dither=sierra2_4a:alpha_threshold=128';
  const run = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', file, '-vf', filter, small], { stdio: 'pipe' });
  if (run.status === 0 && existsSync(small) && statSync(small).size < statSync(file).size) {
    renameSync(small, file);
  } else {
    rmSync(small, { force: true });
  }
}

const argv = process.argv.slice(2);
const names = argv.length ? argv : Object.keys(JOBS);
for (const name of names) {
  const job = JOBS[name];
  if (!job) throw new Error(`Unknown graphic "${name}". Known: ${Object.keys(JOBS).join(', ')}`);
  const [file, query] = job.src.split('?');
  const url = pathToFileURL(join(here, file)).href + (query ? `?${query}` : '');
  shoot({ url, out: join(assets, job.out), w: job.w, h: job.h, scale: job.scale, clear: job.clear, wait: 3000 });
}
