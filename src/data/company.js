// Company information. Every value in [BRACKETS] is a placeholder —
// replace only with information approved by Zarab Construction Company Ltd.
export const company = {
  name: 'Zarab Construction Company Ltd.',
  shortName: 'Zarab',
  profile: '[Approved company profile will be inserted here.]',
  phone: '[PHONE NUMBER]',
  phoneSecondary: '[SECONDARY PHONE NUMBER]',
  email: '[EMAIL ADDRESS]',
  address: '[OFFICE ADDRESS]',
  region: '[CITY, STATE / REGION]',
  hours: '[BUSINESS HOURS]',
  weekendHours: '[WEEKEND AVAILABILITY]',
  // Set to an approved number to show WhatsApp in the form and contact methods.
  whatsapp: null,
  // Real links are added only when approved; null keeps them as non-link placeholders.
  social: [
    { label: '[LINKEDIN]', href: null },
    { label: '[INSTAGRAM]', href: null },
    { label: '[FACEBOOK]', href: null },
    { label: '[OTHER APPROVED CHANNEL]', href: null },
  ],
  // Map embed URL (Google Maps / Mapbox / OpenStreetMap) once the office address is approved.
  mapEmbedUrl: null,
  directionsUrl: null,
};

/** True when a value is still an unapproved placeholder like "[PHONE NUMBER]". */
export const isPlaceholder = (value) => !value || /^\[.*\]$/.test(String(value).trim());

export const stats = [
  { value: '[XX]+', label: 'Projects' },
  { value: '[XX]+', label: 'Years Experience' },
  { value: '[XX]', label: 'Team Members' },
  { value: '[XX]', label: 'Locations' },
];

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Our Team' },
];
