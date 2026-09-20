/**
 * Site-wide details. This is the file to edit for anything that appears in more
 * than one place: the address, the email, the meeting time.
 */
export const site = {
  name: 'Tucson Red Action Group',
  shortName: 'Tucson Red Action',
  initials: 'TRA',
  url: 'https://tucsonredaction.org',
  email: 'info@tucsonredaction.org',

  tagline: 'A politics and history reading group in Tucson.',

  /** One or two sentences, used on the homepage and as the search-result blurb. */
  description:
    'Tucson Red Action Group is a politics and history reading group that meets every Sunday on the east side. We read together, argue in good faith, and put on movie nights, game nights, and workshops.',

  meeting: {
    day: 'Sundays',
    /** e.g. '3:00 PM'. Leave as an empty string to hide the time until you set one. */
    time: '',
    venue: '',
    street: '4675 E Speedway Blvd',
    city: 'Tucson',
    state: 'AZ',
    zip: '85712',
  },
} as const;

export const fullAddress =
  `${site.meeting.street}, ${site.meeting.city}, ${site.meeting.state} ${site.meeting.zip}`;

export const mapUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
