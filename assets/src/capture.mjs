// Captures a public web page, logged out, with headless Chrome over the
// DevTools protocol. Used for the screenshots of make.fun that the guide annotates.
//
//   node assets/src/capture.mjs <url> <out.png> [--width 1280] [--height 1600] [--scale 1]
//        [--wait 9000] [--scroll 0] [--clip x,y,w,h] [--dismiss "button text|next button"]
//        [--full] [--dark | --light] [--max-pixels 15500000]
//
// --full captures the whole page from the top instead of one screen, cut off
// where the picture would pass --max-pixels. --dark and --light ask the page for
// that colour scheme; with neither, the page gets the system's.
// --dismiss clicks the first button whose text contains the given words, which
// closes a welcome dialog before the picture is taken. --clip saves only one
// rectangle of the page (CSS pixels, measured from the top-left of the viewport),
// so nothing outside that rectangle is ever written to disk.
// The clock is set to UTC so that deadlines on the page read in UTC.
//
// Needs Node 22 (for the built-in WebSocket) and Chrome. Environment: CHROME,
// RENDER_TMP (see render.mjs).

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const url = args[0];
const out = args[1] && resolve(args[1]);
if (!url || !out) {
  console.error('usage: capture.mjs <url> <out.png> [--width n] [--height n] [--wait ms] [--scroll px] [--clip x,y,w,h] [--dismiss text]');
  process.exit(2);
}
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i > 0 ? args[i + 1] : fallback;
};
const width = Number(opt('width', 1280));
const height = Number(opt('height', 1600));
const wait = Number(opt('wait', 9000));
const scroll = Number(opt('scroll', 0));
const scale = Number(opt('scale', 1));
const full = args.includes('--full');
const dark = args.includes('--dark');
const light = args.includes('--light');
const maxPixels = Number(opt('max-pixels', 15500000));
const clip = opt('clip', '');
const dismiss = opt('dismiss', '');

const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME to its path.');

const port = 9300 + Math.floor(Math.random() * 400);
const profile = join(process.env.RENDER_TMP || tmpdir(), `day-one-capture-${port}`).replace(/\\/g, '/');
mkdirSync(profile, { recursive: true });
mkdirSync(dirname(out), { recursive: true });

const browser = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--disable-extensions',
  `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`,
  `--window-size=${width},${height}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageSocket() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* Chrome is still starting */ }
    await sleep(250);
  }
  throw new Error('Chrome did not open its debugging port.');
}

let failed = false;
try {
  const ws = new WebSocket(await pageSocket());
  await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = no; });
  let nextId = 0;
  const waiting = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && waiting.has(msg.id)) {
      const { ok, no } = waiting.get(msg.id);
      waiting.delete(msg.id);
      if (msg.error) no(new Error(msg.error.message)); else ok(msg.result);
    }
  };
  const send = (method, params = {}) => new Promise((ok, no) => {
    nextId += 1;
    waiting.set(nextId, { ok, no });
    ws.send(JSON.stringify({ id: nextId, method, params }));
  });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile: false });
  await send('Emulation.setTimezoneOverride', { timezoneId: 'UTC' });
  if (dark || light) {
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }],
    });
  }
  await send('Page.navigate', { url });
  await sleep(wait);

  // several dialogs can follow one another: "first words|second words" clicks each in turn
  for (const words of dismiss.split('|').filter(Boolean)) {
    const wanted = JSON.stringify(words.trim().toLowerCase());
    await send('Runtime.evaluate', {
      expression: `(() => { const b = [...document.querySelectorAll('button, a')]
        .find((el) => el.textContent.trim().toLowerCase().includes(${wanted})); if (b) b.click(); return Boolean(b); })()`,
    });
    await sleep(1500);
  }
  if (scroll) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scroll})` });
    await sleep(1500);
  }

  const shot = { format: 'png' };
  if (clip) {
    const [x, y, w, h] = clip.split(',').map(Number);
    shot.clip = { x, y, width: w, height: h, scale: 1 };
  } else if (full) {
    // the whole page from the top, however tall, capped so the picture stays under maxPixels
    const { result } = await send('Runtime.evaluate', {
      expression: 'Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)',
    });
    const tall = Math.min(result.value, Math.floor(maxPixels / (width * scale * scale)));
    shot.clip = { x: 0, y: 0, width, height: tall, scale: 1 };
    shot.captureBeyondViewport = true;
  }
  const { data } = await send('Page.captureScreenshot', shot);
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log(`${out.replace(/\\/g, '/')}  ${Math.round(Buffer.from(data, 'base64').length / 1024)} KB`);
  await send('Browser.close').catch(() => {});
  ws.close();
} catch (error) {
  failed = true;
  console.error(String(error));
} finally {
  browser.kill();
  await sleep(600);
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
process.exit(failed ? 1 : 0);
