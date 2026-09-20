/**
 * Site-wide details. This is the file to edit for anything that appears in more
 * than one place: the address, the email, the meeting time.
 */
export const site = {
  name: 'Theory and Cactus',
  shortName: 'Theory and Cactus',
  initials: 'T&C',
  url: 'https://tucsonredaction.org',
  email: 'info@tucsonredaction.org',

  tagline: 'A politics and history reading group in Tucson.',

  /** One or two sentences, used on the homepage and as the search-result blurb. */
  description:
    'Theory and Cactus is a politics and history reading group that meets every Sunday on the east side. We read together, discuss in good faith, and put on movie nights, game nights, and workshops.',

  meeting: {
    day: 'Sundays',
    /** e.g. '3:00 PM'. Leave as an empty string to hide the time until you set one. */
    time: '10:30 AM',
    venue: 'Revolutionary Grounds',
    street: '4675 E Speedway Blvd',
    city: 'Tucson',
    state: 'AZ',
    zip: '85712',
  },
} as const;

export const fullAddress =
  `${site.meeting.street}, ${site.meeting.city}, ${site.meeting.state} ${site.meeting.zip}`;

/** The address as it reads on the homepage: venue name first. */
export const venueAddress = site.meeting.venue
  ? `${site.meeting.venue} - ${site.meeting.street}, ${site.meeting.city}, ${site.meeting.state}, ${site.meeting.zip}`
  : fullAddress;

export const mapUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
