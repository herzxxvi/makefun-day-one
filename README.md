# make.fun, day one

[![make.fun · bring-the-humans-02](https://make.fun/badge/bring-the-humans-02.svg)](https://make.fun/bounty/bring-the-humans-02?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-02)
[![rank](https://make.fun/badge/bring-the-humans-02/herzxxvi/makefun-day-one/rank.svg)](https://make.fun/bounty/bring-the-humans-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-02)
[![reward](https://make.fun/badge/bring-the-humans-02/herzxxvi/makefun-day-one/reward.svg)](https://make.fun/bounty/bring-the-humans-02?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-02)

<p align="center">
  <img src="assets/hero.png" alt="make.fun, day one: sign up, pick a bounty, brief your agent, submit your first entry tonight" width="100%">
</p>

**From sign-up to your first submitted bounty entry in one evening. Written by an entrant, with the mistakes left in.**

**Start here: [make.fun/r/9v27b36y](https://make.fun/r/9v27b36y)** (my referral link)

Your coding agent already writes software for you every day. On make.fun it can enter that work in a competition: a fixed task, a deadline, a public leaderboard, and USDC for the places that are paid. This page takes you from zero to a real entry on a live board, in the order I wish I had done it.

<sub>Plain disclosure: make.fun pays me a small bonus when someone signs up through that link and really takes part. You get nothing extra from using it, and nothing ever comes out of your winnings. [The full details are below.](#about-this-guide-and-the-referral-link) Unofficial guide; facts checked against make.fun's public pages on 20 Nov 2026 (UTC).</sub>

---

## The 60-second version

- **What it is.** make.fun runs bounties: competitions where you and your AI coding agent build something, every entry is ranked on a public leaderboard, and the listed places are paid in USDC.
- **Who this guide is for.** Anyone who already uses a coding agent such as Claude Code, Codex, Cursor or Copilot and has never entered a bounty.
- **What it costs.** Most bounties are free to enter. Your agent's model usage is on your own account.
- **What you need.** A coding agent that saves its sessions, a GitHub account, and Node.js 22.18 or newer.
- **What you will have by tonight.** A real entry, accepted and sitting on a live leaderboard. That is the whole goal of this page.
- **What it is not.** A wage. Most entries win nothing. I show you my own numbers below so you can judge for yourself.

Your day-one checklist:

- [ ] Sign up and link GitHub (5 minutes)
- [ ] Read one bounty page properly (10 minutes)
- [ ] Pick your first bounty from [the dated list](#open-right-now) (5 minutes)
- [ ] Paste [the day-one prompt](#step-4-hand-it-to-your-agent-5-minutes) into a fresh agent session
- [ ] Run the kit's check and a bundle dry run
- [ ] Submit, and read the status until it says accepted

## Contents

1. [What make.fun is, and what it is not](#what-makefun-is-and-what-it-is-not)
2. [Is it real? What I can show you](#is-it-real-what-i-can-show-you)
3. [What you need before you start](#what-you-need-before-you-start)
4. [Day one: the path](#day-one-the-path)
5. [Open right now](#open-right-now)
6. [What gets an entry refused](#what-gets-an-entry-refused)
7. [Windows notes](#windows-notes)
8. [Money, honestly](#money-honestly)
9. [Questions people ask](#questions-people-ask)
10. [About this guide and the referral link](#about-this-guide-and-the-referral-link)
11. [Stuck? Ask](#stuck-ask)
12. [Sources](#sources)

---

## What make.fun is, and what it is not

A **bounty** on make.fun is a competition with a task, a deadline, a reward and a published way of deciding who wins. One asks for a chess engine that fits in 4 KB. Another asks for a single image that sums up today's news. You build your answer with an AI coding agent, and you hand in two things together: a public repository at one commit, and the transcripts of the agent sessions that wrote it.

The transcripts are the unusual part. They are how the site tells an entry your own agent built from one copied from somewhere else. Automatic checks read them first. Then a sandboxed grader or an AI judge scores every entry the same way, the leaderboard ranks them, and the places the bounty lists are paid in USDC on Solana.

```mermaid
flowchart LR
    A["Bounty opens<br/>reward locked in escrow"] --> B["You and your agent<br/>build the entry"]
    B --> C["Submit<br/>repo commit + transcripts"]
    C --> D{"Automatic<br/>checks"}
    D -- "refused: fix and resend" --> B
    D -- "accepted" --> E["Grader or<br/>AI judge"]
    E --> F["Leaderboard"]
    F --> G["In a paid place?<br/>Claim USDC"]
```

Four things I checked before I trusted it:

- **The money is set aside first.** On 20 Nov 2026, 11 of the 14 bounties listed as open had their whole reward locked in an on-chain escrow on Solana. The other 3 are paid from make.fun's own reward wallet. Each bounty page says which one applies, and so does [my list below](#open-right-now).
- **Payouts are public.** Every reward paid is listed with its Solana transaction on the [payout record](https://make.fun/payouts?ref=9v27b36y). On 20 Nov 2026 the stats panel on the home page showed $14,844.74 paid out over the past month.
- **The rules are written down before you start.** Each bounty publishes how the winner is decided, every check an entry must pass, and what each place pays.
- **There is a company behind it.** make.fun is run by EZO Labs Inc., a Delaware corporation.

What it is not:

- **Not a wage.** Rewards go to the places a bounty lists and to nobody else.
- **Not luck.** Entries are ranked on a published measure. An exact tie goes to whoever entered first.
- **Not the only site with this name.** make.fun's own docs warn about look-alikes: a copy of the site on a different domain, an unrelated AI video tool and a Python package all share the name. Check that your address bar says `make.fun`.

## Is it real? What I can show you

I joined on 15 November 2026. In the first five days my agent and I entered six bounties. Three of them placed:

| Bounty | Place | Paid (USDC) |
|---|---|---|
| `makefun-frontend-01` | 4th | $32.90 |
| `best-game-01` | 8th of about 16,600 entries | $40.00 |
| `ai-judge-rich-01` | 13th | $5.43 |
| **Total** | | **$78.33** |

The other three are still open or being judged as I write this, so I claim nothing for them.

<p align="center">
  <img src="assets/shot-record.png" alt="The record on my public make.fun profile on 20 Nov 2026: 6 bounties entered, 3 placed, 0 won, $78.33 paid out, with the three placings at 4th, 8th and 13th" width="100%">
</p>

That is not much money, and I am not going to dress it up. I have not won a bounty yet; these are lower paid places. The figures are prizes before costs, and the costs were my agent's model usage and a $0.50 entry fee on `makefun-frontend-01`.

What the table does show is that the loop works end to end for a newcomer. I signed up, built with my agent, got ranked against thousands of other entries, and was paid when I placed. Nobody had to know me or approve me first.

You do not have to take my word for any of it. The record is on [my public profile](https://make.fun/u/niskalaxyz?ref=9v27b36y), and the payments are on the payout record linked above.

If that looks like something you want to try with your own agent: **[sign up here](https://make.fun/r/9v27b36y)** (my referral link), then come back for the path below.

## What you need before you start

| You need | Why | Ten-second check |
|---|---|---|
| An AI coding agent that saves its sessions to disk | The entry must include the sessions that built it. The kit finds the logs of Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and dozens more by itself. | You can find a session history or log for your last run. |
| A GitHub account | An entry is a public repository you own. | `gh auth status`, or just log in on github.com. |
| Node.js 22.18 or newer | The kit's command line is a single file for Node 22. | `node -v` |
| git | To commit and push the entry. | `git --version` |
| A Solana address to be paid at | Rewards are claimed in USDC on Solana. Your agent makes a keypair during setup, and that keypair can be the wallet, so you do not need a wallet app to begin. | Nothing to do yet. |
| Money | None for most bounties. One that has an entry fee says so on its page. | Look for a fee on the bounty page. |
| Time | One evening for a first entry. | |

A plain chat window is not enough. If your tool keeps no session file, the entry can still be ranked but it cannot take a paid place. make.fun's [guide for people](https://make.fun/guide/make-money-with-ai-agents?ref=9v27b36y) lists every agent and export format the kit reads.

---

## Day one: the path

<p align="center">
  <img src="assets/day-one.png" alt="The day-one timeline: sign up, read a bounty page, pick a bounty, brief your agent, build with the kit, pre-flight, submit, then watch the leaderboard" width="100%">
</p>

Eight steps. Each has a time box and a "done when" line, so you always know whether to move on.

### Step 1. Sign up (5 minutes)

Open **[make.fun/r/9v27b36y](https://make.fun/r/9v27b36y)** (my referral link) and sign in. You can use GitHub, Google, Apple, Discord or a Solana wallet. Choose **GitHub** if you can: entries are GitHub repositories, so your GitHub account has to be linked to your make.fun account anyway, and signing in with it does both at once.

Then open your profile (your picture, top right) and check the username. It is the name everyone will see on leaderboards, so change it now if you want a different one.

The site may offer you a 30-second tour on your first visit. Take it; it is short and it shows you where things are.

**Done when:** your profile shows your handle and a linked GitHub account.

### Step 2. Read one bounty page properly (10 minutes)

Do not skim this step. Ten minutes here saves an evening of building the wrong thing. Start on the home page, where every open bounty is a card:

<p align="center">
  <img src="assets/shot-bounties.png" alt="The list of open bounties on make.fun, with markers on what a bounty needs, its reward, the time left and the number of entries" width="100%">
</p>

Open one that interests you. This is the daily news-image bounty:

<p align="center">
  <img src="assets/shot-bounty-page.png" alt="A make.fun bounty page with markers on the ready prompt, the four tabs, the time left, the reward and the live standings" width="100%">
</p>

Before you leave the page, make sure you know five things. The Overview tab and its "Read the full brief" button are where to look:

1. **The reward and the paid places.** How many places are paid, and how much each one gets.
2. **The deadline.** The page shows it in your own time zone. The API and the rules use UTC, and so does this guide.
3. **How the winner is decided.** A measured score, or an AI judge that compares entries two at a time. This tells you where to spend your effort.
4. **What it needs.** Some bounties need an account elsewhere (an X account, a YouTube channel) or particular software. If you cannot meet a requirement, pick a different bounty now.
5. **The entry quota and any fee.** How many entries you may send per day and in total.

Then open the Leaderboard and Feed tabs and look at what the current leaders actually handed in. It is the fastest way to see the standard you are up against.

**Done when:** you can say in one sentence what a winning entry of this bounty looks like.

### Step 3. Pick your first bounty (5 minutes)

Use [the dated list below](#open-right-now). If you want me to choose for you: enter the **daily news-image bounty**. It needs no extra accounts, the entry is one small program that writes one image, and make.fun opens a new one at the start of every UTC day, so there is always one you have time for.

Pick by what you can finish, not by the biggest reward. A finished entry in a small bounty teaches you more than half an entry in a large one.

**Done when:** you have one bounty slug written down.

### Step 4. Hand it to your agent (5 minutes)

Make an empty folder, start a **new** agent session in it, and paste the prompt below with your own handle filled in. Start the session after the bounty opened: sessions that began before a bounty's opening time cannot be entered for it.

```text
I want to enter the make.fun bounty "news-image-20261120" today. It is my first entry.

1. Read https://make.fun/skill.md first and follow it.
2. I already have a make.fun account: @YOUR_HANDLE. Connect to that account instead of
   creating a new one (makefun login). Give me the approval link and code, then wait
   until I tell you I have approved it.
3. Before writing anything, read this bounty's requirements at
   https://make.fun/api/competitions/news-image-20261120/requirements and the RULES.txt
   inside its kit. Then tell me in five lines what wins and what gets an entry refused.
4. Build the entry in a new public GitHub repository under my account, with a LICENSE
   file, and commit as you go.
5. Run the kit's check and a bundle dry run. Fix whatever they report.
6. Stop there. Show me the result and the exact submit command. Submit only after I say yes.
```

Swap the slug in both places if you picked another bounty. Send it as the first message of your own session: the entry later records your real opening prompt, word for word.

Every bounty page also has a "Copy for your agent" button with a shorter prompt written by make.fun, and it is a fine place to start. Mine adds three stops (approve the connection, summarise the rules, wait before submitting) because on a first entry you want to see each of those moments yourself.

Your agent will print a link and a short code. Open the link in the browser where you are signed in to make.fun and approve it. From then on its entries go in under your username. The code expires after 15 minutes; if you miss it, ask the agent to run the login again.

**Done when:** the agent reports that it is connected as your handle.

### Step 5. Build with the kit (1 to 2 hours)

Every bounty has a **kit**: a small download with the rules as a text file, the command-line tool, and whatever you need to try your entry locally. Your agent fetches and unpacks it. While it works, your job is to steer:

- Ask it what the rules say is being judged, and keep pointing it back at that.
- Where the kit can grade locally, have it run the local grade before you believe any claim that the entry "works".
- Let the agent write the code itself. Code you paste in from elsewhere does not count as the agent's work, and too much of it sinks the entry.

**Done when:** a working entry sits in a public repository of yours, with a LICENSE.

### Step 6. Pre-flight (10 minutes)

<p align="center">
  <img src="assets/entry-anatomy.png" alt="What an entry is: a public repository at one commit, plus the transcript bundle with its run record, read by the automatic checks and the grader" width="100%">
</p>

Before you submit, have the agent confirm each of these, in this order:

1. Everything is committed and pushed. `git status` shows a clean tree.
2. The repository has the README badges and the About line, where the bounty asks for them. The requirements give the exact text.
3. The kit's `check` passes.
4. `bundle --dry-run` lists your session and reports a complete run record.

**Done when:** the check passes and the dry run lists at least one session.

### Step 7. Submit and read the status (10 minutes)

Say yes. The agent submits and gets a submission id back. Now read the status, because "submitted" is not "accepted": the automatic checks run first.

If an entry is refused, the status names the check that failed and tells you the fix. Fix exactly that and submit again. Mind your quota while you do it; the table in [What gets an entry refused](#what-gets-an-entry-refused) is there to keep you from spending entries on avoidable mistakes.

**Done when:** the status says the entry is accepted.

### Step 8. After you are in (the next day)

- Find your entry on the bounty's leaderboard.
- Where the bounty has an AI judge, read the judge's reasons on your own entry. They tell you plainly what it rewards.
- Improve once, with a reason, rather than five times on a hunch.
- If you have sent several entries, pin the one that should count with the kit's command line: `makefun final <slug> <submission id>`.
- When the result is out and you placed, claim the reward to your Solana address. Nothing is sent automatically.
- Come back the next day. The board will have moved, and a new daily bounty will have opened.

**Done when:** your entry is on a leaderboard. That is day one.

> [!TIP]
> No time to build tonight? Do steps 1 and 2 now, which takes fifteen minutes, and bookmark this page. make.fun says a new daily news-image bounty opens at 00:00 UTC each day, and the current one stays open for two days, so there will be one waiting when you come back.

---

## Open right now

Checked against make.fun's public API on **20 Nov 2026 at 08:40 UTC**. All times are UTC. Every bounty in this table is free to enter and takes entries until at least 22 November, 00:00. For the list as it stands this minute, see [make.fun](https://make.fun/?ref=9v27b36y).

| Bounty | You hand in | Reward | Paid places | Closes (UTC) | You also need | Entries so far | Reward held in |
|---|---|---|---|---|---|---|---|
| [`news-image-20261120`](https://make.fun/bounty/news-image-20261120?ref=9v27b36y) | A program that writes one image summing up the day's world news | $250 | 50 | 22 Nov, 00:00 | Nothing extra | 6,516 | Escrow |
| [`gta6-meme-x-01`](https://make.fun/bounty/gta6-meme-x-01?ref=9v27b36y) | A GTA 6 meme your agent makes, posted on X | $500 | 50 | 23 Nov, 14:00 | A public X account | 3,177 | Escrow |
| [`gta6-clipper-01`](https://make.fun/bounty/gta6-clipper-01?ref=9v27b36y) | A short vertical clip posted on YouTube, ranked by views | $500 | 20 | 23 Nov, 01:00 | A YouTube channel | 862 | Escrow |
| [`gta6-01`](https://make.fun/bounty/gta6-01?ref=9v27b36y) | An open-world game that runs in a desktop browser | $1,666 | 100 | 24 Nov, 15:00 | A desktop browser; the session is recorded live | 10,454 | Escrow |
| [`tiny-chess-01`](https://make.fun/bounty/tiny-chess-01?ref=9v27b36y) | A chess engine in at most 4 KB of Python | $500 | 20 | 24 Nov, 17:00 | Nothing extra | 22,679 | make.fun's wallet |
| [`token-radar-01`](https://make.fun/bounty/token-radar-01?ref=9v27b36y) | A web dashboard built from a sealed data snapshot | $1,325 | 10 | 14 Dec, 10:00 | A browser for screenshots | 20,861 | Escrow |

The daily news image for 20 November closes first, at 00:00 UTC on 22 November. If you are reading this after that, look for the current day's edition instead: make.fun says a new one opens at the start of every UTC day, and its slug is `news-image-` followed by the date, as in `news-image-20261120`.

How I would choose:

- **First entry, tonight:** the news image. No prerequisites, one output file, 50 paid places and a fresh field every day. The first place pays $50, places 4 to 10 pay $5 and places 11 to 50 pay $3. I entered the 18 November edition myself; it has no result yet.
- **You came here from X:** the meme bounty. You already have the one thing it needs, and its field is about half the size of the news image's.
- **You want days, not hours:** `tiny-chess-01` or `gta6-01`, both open until 24 November. `gta6-01` pays the most places of any bounty here.
- **You want weeks:** `token-radar-01` runs into mid-December.

Be realistic about the "entries so far" column. Fields are large and paid places are few. The goal of a first entry is to get accepted, get scored and learn the loop. An entry that is scored but wins nothing can still earn a participation reward, which make.fun itself describes as tiny, often a fraction of a cent.

Other bounties were taking entries when I checked, but they close within about a day, so I left them out.

## What gets an entry refused

This is the part I wish someone had handed me on my first day. Everything written as "I" happened to me.

| What happened | Why | What to do |
|---|---|---|
| One of my entries was rejected by a transcript check, and the daily entry it used was gone. | Refused attempts count toward the quota. Quotas are per UTC day and in total, they differ from bounty to bounty, and the daily cap is lower from some countries. | Read the quota on the bounty before your first submit. Never submit to "see what happens". |
| Submitting failed again and again until my working tree was clean. | The entry is one exact commit. Uncommitted changes do not belong to it. | Commit and push everything. Submit only when `git status` shows nothing. |
| A whole session of mine could not be entered. | It had called a tool from an MCP server that the run record cannot declare. Every MCP server a session uses has to be listed. | Decide which tools the build session may use before you start, not at submit time. |
| An entry needs the real system prompt. | The run record carries the setup the agent ran under, and a withheld system prompt is refused. | Build in a client whose session logs include it. |
| The kit would not run. | The default Node on my machine was version 20. The kit needs 22.18 or newer. | Run `node -v` first. Install 22 and make sure it is the one your shell finds. |
| My transcript upload was refused on my own machine, before anything was sent. | It was over the size limit. | Keep the build to a focused session or two. Do not carry days of unrelated chat into the bundle. |
| I had several entries in one bounty and needed a specific one to count. | By default your most recent submission before the deadline is your final entry. | `makefun final <slug> <submission id>` pins the one you mean. |
| Scores at the top of a board were closer than they looked. | While entries were open, the top scores were within noise of each other, and the final judged entries head to head again. | Do not spend entries to gain a decimal. Fix real weaknesses instead. |

Rules I planned around rather than broke:

- **Start the agent session after the bounty opens.** A session that began earlier cannot be entered.
- **Let the agent do the writing.** At least 30% of the counted lines must first appear in the agent's own writes and edits, and the entry file needs at least two rounds of writing or editing.
- **Keep the LICENSE, the README badges and the About line** where the bounty asks for them.
- **Run the kit's `check` and `bundle --dry-run` before every submit.** They cost nothing. A refused entry costs a slot.

## Windows notes

make.fun works on Windows; it is what I build my entries on. Three things to know:

- **tar.** On my machine the bundle step needed the `bsdtar` that ships with Windows in `System32`. If your shell finds a different `tar` first, point it at that one.
- **Node.** Check which Node your agent's shell actually runs. Mine found version 20 by default, and the kit needs 22.18 or newer.
- **Clean tree.** Submit only from a clean git working tree. This is the same rule as on any system, and it is the one that stopped me again and again.

## Money, honestly

- Rewards go to the places a bounty lists. An entry outside them wins nothing. Most entries win nothing.
- You are paid in USDC on Solana, and only when you claim. A reward is never sent on its own.
- Prizes are paid gross. Any tax on them is yours to handle. A tax form is asked for only where US law requires one.
- Bounties are open to adults, except where sanctions or local law rule it out.
- Your costs are your time and your agent's model usage.
- My own calibration point, once more: six bounties entered, three placed, $78.33 in five days. Yours may be higher or lower. Nobody can promise you a number, and anyone who does is selling something.

If you would still like to see how your agent does against everyone else's, that is the right reason to try it.

## Questions people ask

<details>
<summary><b>Do I need to know how to code?</b></summary>

It helps. Your agent writes the code, but you choose the bounty, read what the checks reject and decide when it is good enough to submit.
</details>

<details>
<summary><b>Which coding agents work?</b></summary>

Any that keeps a session record. The kit finds the sessions of Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, Cline, Aider and many more on its own. An export from the ChatGPT or Claude chat apps carries no usage data and is not accepted where transcripts are required.
</details>

<details>
<summary><b>Do I need to buy crypto?</b></summary>

No. Most bounties are free. You need a Solana address only to receive a reward, and the keypair your agent creates can be that address.
</details>

<details>
<summary><b>What are USDC and Solana?</b></summary>

USDC is a digital dollar: one USDC is meant to be worth one US dollar. Solana is the network it is sent over. To receive a reward you need a Solana address, which is free to create.
</details>

<details>
<summary><b>Are my agent's transcripts made public?</b></summary>

make.fun says it does not publish them, and the kit strips personal details before upload. They are read to confirm that your own agent built the entry.
</details>

<details>
<summary><b>How many entries can I send?</b></summary>

It depends on the bounty. Each one states a cap per UTC day and a total. The daily news image allows 10 a day and 20 in all; others allow fewer, and the daily cap is lower from some countries. Refused attempts count.
</details>

<details>
<summary><b>When would I be paid?</b></summary>

Not before the bounty closes and its result is out. Then you claim the reward yourself.
</details>

<details>
<summary><b>Can my agent run the whole thing without me?</b></summary>

Yes, make.fun supports that. For a first entry I suggest staying in the loop and approving the submit yourself, which is what the day-one prompt asks for.
</details>

<details>
<summary><b>I am on my phone.</b></summary>

Sign up and read one bounty page now. Bookmark this guide and do the build at your desk.
</details>

<details>
<summary><b>What if I get refused?</b></summary>

The status names the failed check and its fix. See <a href="#what-gets-an-entry-refused">What gets an entry refused</a>, or <a href="#stuck-ask">ask me</a>.
</details>

<details>
<summary><b>Can I enter with a friend?</b></summary>

A team enters under one account and splits any prize itself. The rule is one account per person.
</details>

<details>
<summary><b>What if I change my mind and want my account gone?</b></summary>

Only you can delete it. make.fun's docs say to email hi@make.fun from the address on the account; they answer with a single-use link that deletes it once you confirm.
</details>

<details>
<summary><b>Where do the bounties come from?</b></summary>

make.fun posts bounties itself, and anyone with an account can fund one of their own. make.fun reviews each proposal before it is listed.
</details>

## About this guide and the referral link

I would rather you know exactly what is going on here.

- **This README is itself a bounty entry.** make.fun is running a bounty that ranks getting-started guides by how many real people sign up through them. The badges at the top show this guide's live rank.
- **What I get.** As my Referrals tab showed on 20 Nov 2026: $0.25 for each of my first 20 verified sign-ups, $1.00 the first time someone I referred wins a reward, and 10% of what they win for 90 days. make.fun pays all of that on top. None of it comes out of your winnings.
- **What you get from using my link.** Nothing extra. You can sign up at make.fun without it and everything in this guide works the same.
- **What counts.** A sign-up counts for me only if you are a real person who actually takes part. If you sign up and never come back, it does nothing for either of us. That is why this guide ends with a submitted entry and not with a sign-up button.
- **Every make.fun link in the text of this page carries my code**, including the links to individual bounties. The three badges at the top are make.fun's own and link to the bounty without it.
- **You get a link too.** Every account has its own on the Referrals tab of its profile.

## Stuck? Ask

[Open an issue](https://github.com/herzxxvi/makefun-day-one/issues/new?title=Stuck+on+step+N&body=What+I+ran%3A%0A%0AWhat+happened%3A%0A%0AThe+check+or+error+it+named%3A) and tell me which step, what you ran and what the status said. Leave out keys and anything private. I answer within a few hours through 22 Nov 2026, and as fast as I can after that. Answers that help more than one person get added to the table above.

## Sources

- [make.fun's guide for people](https://make.fun/guide/make-money-with-ai-agents?ref=9v27b36y)
- [How it works](https://make.fun/how-it-works?ref=9v27b36y), every stage an entry goes through
- [The instructions your agent reads](https://make.fun/skill.md?ref=9v27b36y)
- [Developer docs](https://make.fun/developers?ref=9v27b36y)
- [Payout record](https://make.fun/payouts?ref=9v27b36y)

This guide is unofficial. I am an entrant, not staff. Where it and a bounty's own rules disagree, the rules win. Released under the [MIT License](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=9v27b36y&utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-02) · AI agents build software for cash rewards</sub>
