# Clocked

**Live app:** https://clocked-opal-omega.vercel.app/
**Course:** DESIGNTK 590, UX & Front-End Engineering, Project 1 ("Ship a Micro-App")
**Prioritized viewing context:** desktop

Clocked is a small web app that helps you find out how good your judgment is about your own time. Before you start a task, you predict how long it will take and how confident you are. Then you time it, and Clocked shows you how far off you were.

## Intended audience

Students and really anyone who plans their time by gut feel (homework, writing, gym sessions, errands) and wants to see how accurate their estimates really are.

## Problem or opportunity

Most people underestimate how long tasks take, and almost nobody checks. Without a record, every estimate feels reasonable and the same mistakes repeat. Clocked makes the check quick: one prediction, one timer, one comparison, and a running history of estimates versus reality.

## Primary user flow

1. **Make a Bet.** Enter a task, an estimate in whole minutes, and a confidence level (50% to 90%). "Lock It In" stays disabled until all three are valid, and a hint says what is missing.
2. **Locked in.** The bet is summarized, and a random motivational quote is fetched from an external API (loading, success, and error states are handled). Press **Start Timer**.
3. **Active timer.** A clock counts up. **Finish** stops it; **Cancel bet** discards it.
4. **Reality Check.** The app compares your estimate with the measured time: the difference in minutes and the percent error ("Over by 21%", "Under by 9%"). You answer "Did you finish what you intended?" and save the result.
5. **History.** Saved bets appear under "Recent calls" on the home screen and on a full History screen. They persist in the browser between visits.

**Supporting flows:** viewing History, and canceling a bet.

## Technical stack

- Next.js 16 (App Router) and React 19, with TypeScript
- Tailwind CSS 4 for styling
- Browser `localStorage` for saving history (no database and no accounts)
- Git and GitHub (feature branches merged through pull requests), deployed on Vercel

`app/page.tsx` holds the app's state, including which screen is showing, and renders one component per screen from `app/components/`. The timer stores a start time (`Date.now()`) and computes elapsed time from it, so the result stays accurate even if the display updates late.

## API used and how it contributes

**Motivational Spark quotes API** (listed on [freepublicapis.com](https://www.freepublicapis.com/quotes-api)).
Endpoint: `GET https://motivational-spark-api.vercel.app/api/quotes/random`. It needs no API key. It returns JSON shaped like `{ "author": "...", "quote": "..." }`.

The app calls it when you press "Lock It In", and shows the quote on the Locked screen as a short moment of reflection before the timer starts. It is a supporting element of the flow. The core comparison of estimate versus reality does not depend on it, so a failed request shows a short fallback message and never blocks "Start Timer".

## Run it locally

Requires Node.js 20.9 or newer (needed by Next.js 16).

```bash
git clone https://github.com/Aidan-OD-tech/repo1.git
cd repo1
npm install
npm run dev
```

Then open http://localhost:3000. No environment variables or API keys are needed.

## Known limitations

- **In-progress bets are not saved.** Refreshing or closing the page during a running timer loses that bet. Only completed bets are stored.
- **History is per browser.** It lives in `localStorage`, so it is not synced across devices, and clearing site data erases it.
- **The quote API's error state was verified by code review, not simulated in the browser.** The code checks the response status and catches failures, but I did not test it offline.
- **Desktop-first.** It has not been tuned or tested for mobile screens.

## What I would improve next

- Restore an in-progress bet after a refresh.
- Summarize calibration over time: average error, and whether high-confidence bets are actually more accurate.
- Let users edit or delete history entries.
- Test and refine the layout for mobile.
- Have a clean way to visualize compiled data from bet history...

Built with help from Claude and Claude Code. I reviewed, tested, and committed each step myself.
