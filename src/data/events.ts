/**
 * The schedule.
 *
 * Add an entry for each meeting or event. Order does not matter, the site
 * sorts by date and splits upcoming from past on its own.
 *
 * Only `date`, `title`, and `kind` are required. Leave `location` off and the
 * event uses the usual Sunday address from `site.ts`.
 *
 * Note: "upcoming" is decided when the site is built. Cloudflare rebuilds on
 * every push, so an event moves into the archive the next time you push.
 */

export type EventKind = 'reading' | 'movie' | 'game' | 'workshop' | 'other';

export interface ClubEvent {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** e.g. '6:30 PM' or 'Doors 6:30'. Optional. */
  time?: string;
  title: string;
  kind: EventKind;
  /** What we're reading, for `kind: 'reading'`. */
  book?: { title: string; author: string; note?: string };
  /** A sentence or two. Optional. */
  description?: string;
  /** Overrides the default Sunday address. */
  location?: string;
}

export const events: ClubEvent[] = [

  {
    date: '2026-09-20',
    time: '10:30 AM',
    title: 'Liberation Writing Workshop 3.0',
    kind: 'workshop',
    location: "BCC: 657 W St Mary's Rd, Unit C11",
    description: 'Bring poetry, political writing, or any other literary art. We may move to Revolutionary Grounds Cafe if space is too hot. Free and open to the public.',
  },
  {
    date: '2026-09-20',
    time: '12:30 PM',
    title: 'Weekly Book Club',
    kind: 'reading',
    book: {
      title: 'Caliban and the Witch: Women, the Body and Primitive Accumulation',
      author: 'Silvia Federici',
    },
    location: 'Revolutionary Grounds Cafe',
    description:
      "Federici's 2004 feminist-Marxist history argues that the transition from feudalism to capitalism required a violent war against women's bodies and reproductive labor. Free and open to the public.",
  },
  {
    date: '2026-09-27',
    time: '10:30 AM',
    title: 'Weekly Book Club',
    kind: 'reading',
    book: {
      title: 'Caliban and the Witch: Women, the Body and Primitive Accumulation',
      author: 'Silvia Federici',
    },
    location: 'Revolutionary Grounds Cafe',
    description:
      "Federici's 2004 feminist-Marxist history argues that the transition from feudalism to capitalism required a violent war against women's bodies and reproductive labor. Free and open to the public.",
  },
  {
    date: '2026-10-11',
    time: 'Doors 6:30 PM',
    title: 'Movie Night: They Live',
    kind: 'movie',
    location: 'Revolutionary Grounds Cafe',
    description: 'John Carpenter, 1988. Free and open to the public.',
  },
  {
    date: '2026-11-08',
    time: 'Doors 6:30 PM',
    title: 'Movie Night: Union',
    kind: 'movie',
    location: 'Revolutionary Grounds Cafe',
    description: 'The Amazon Labor Union documentary. Free and open to the public.',
  },
  {
    date: '2026-07-18',
    time: '10:00 AM',
    title: 'Liberation Writing Workshop 2.0',
    kind: 'workshop',
    location: "657 W St Mary's Rd, Unit C11",
    description: 'Bring poetry, political writing, or any other literary art.',
  },
  {
    date: '2026-07-11',
    time: 'Doors 6:30 PM',
    title: 'Movie Night: Blade Runner',
    kind: 'movie',
    location: 'Revolutionary Grounds Cafe',
  },
  {
    date: '2026-05-09',
    time: 'Doors 6:30 PM',
    title: 'Movie Night: Judas and the Black Messiah',
    kind: 'movie',
    location: 'Revolutionary Grounds Cafe',
  },
];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Parsed as local noon so a date never slips a day across time zones. */
const asDate = (iso: string) => new Date(`${iso}T12:00:00`);

export const upcomingEvents = () =>
  events
    .filter((e) => asDate(e.date) >= startOfToday())
    .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = () =>
  events
    .filter((e) => asDate(e.date) < startOfToday())
    .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  asDate(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const kindLabels: Record<EventKind, string> = {
  reading: 'Reading',
  movie: 'Movie night',
  game: 'Game night',
  workshop: 'Workshop',
  other: 'Event',
};
