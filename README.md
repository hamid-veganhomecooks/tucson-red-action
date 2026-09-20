# tucsonredaction.org

The website for Theory and Cactus, a politics and history reading
group meeting Sundays at Revolutionary Grounds Cafe 4675 E Speedway Blvd, Tucson.

It's a single static page built with [Astro](https://astro.build): hero,
schedule, about, join, find-us. No database, no JavaScript shipped to the
browser, no tracking. It deploys to Cloudflare Pages.

---

## Editing the site

Almost everything you'll want to change lives in two files.

### `src/data/events.ts` — the schedule

Add an entry to the `events` array:

```ts
{
  date: '2026-10-05',          // required, YYYY-MM-DD
  title: 'Discussion: Chapters 1–4',
  kind: 'reading',             // reading | movie | game | workshop | other
  time: '3:00 PM',             // optional
  book: { title: 'The Jakarta Method', author: 'Vincent Bevins' },  // optional
  description: 'First meeting on the new book.',                    // optional
  location: 'Revolutionary Grounds Cafe',  // optional — omit for the usual address
}
```

Order doesn't matter. The page sorts by date, shows what's upcoming, and tucks
everything older into a collapsed "Past events" list.

> One thing to know: "upcoming" is decided **when the site is built**. Cloudflare
> rebuilds on every push, so an event slides into the archive the next time
> anyone pushes a change. If a week goes by with no pushes, a finished event may
> still be sitting under "Upcoming". Pushing anything (or hitting *Retry
> deployment* in the Cloudflare dashboard) fixes it.

### `src/data/site.ts` — address, email, meeting time

The meeting time is currently blank, so the site just says "We meet Sundays".
Fill in `meeting.time` (e.g. `'3:00 PM'`) and it appears everywhere at once.


### Everything else

The prose in the About and Join sections is a first draft — rewrite it to sound
like you. It's plain text in `src/pages/index.astro`.

Colors, fonts, and spacing are CSS variables at the top of
`src/styles/global.css`.

---

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321. Edits show up instantly.

```bash
npm run build
```

Builds to `dist/`. `npm run preview` serves that build locally.

---

## Deploying to Cloudflare Pages

Push this repo to GitHub, then in the Cloudflare dashboard: **Workers & Pages →
Create → Pages → Connect to Git**, pick the repo, and use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22 (already pinned by `.node-version`) |

Every push to `main` deploys. Pull requests get their own preview URL.

### Custom domain

After the first deploy, go to the project's **Custom domains** tab and add
`tucsonredaction.org` and `www.tucsonredaction.org`. If the domain is already on
Cloudflare, DNS is set up for you; otherwise Cloudflare shows you the records to
add at your registrar.

### Deploying without the Git integration

```bash
npm run build && npx wrangler pages deploy dist --project-name=tucsonredaction
```

### Security headers

`public/_headers` sets a content security policy and cache rules. If you ever
add an embedded video, a map iframe, or an external font, you'll need to loosen
the `Content-Security-Policy` line there or the browser will silently block it.

---

## V2 — ranked-choice book voting

Not built yet, and deliberately so: it needs server-side state, which this site
doesn't have. When you're ready, the shape is roughly:

- A **Cloudflare Worker** with a **D1** database (or a Durable Object) holding
  the candidate books and the submitted ballots.
- A voting page here that posts ballots to the Worker.
- Some gate on who can vote — a shared link secret from the Signal chat is the
  cheap version; Cloudflare Access is the real one.
- Instant-runoff tallying in the Worker, results published back to the site.

Adding a Worker means switching this project from Pages to Workers static
assets, or running the Worker as a separate service on
`vote.tucsonredaction.org`. The second is less disruptive.
