// Transcribed and adapted from the company profile supplied on 8 October 2026.
// See CONTENT_SOURCES.md for provenance and information still required.
export const company = {
  name: 'Zarab Construction Company Ltd.',
  legalName: 'Zarab Construction Ltd',
  shortName: 'Zarab',
  incorporated: '26 June 2008',
  registrationNumber: 'RC 756052',
  profile: 'Incorporated in 2008, Zarab Construction Company Ltd. provides building construction and civil engineering services to the public and private sectors in Nigeria. Our work spans roads, bridges, buildings, water resources and related infrastructure, supported by a multidisciplinary team and construction equipment.',
  phone: '08035603966',
  phoneSecondary: '[SECONDARY PHONE NUMBER]',
  email: 'ybadmus43@yahoo.com',
  emailSecondary: 'obasa2009@yahoo.com',
  address: '23 Kolaq Bus Stop, Ishashi',
  region: 'Ishashi',
  hours: '[BUSINESS HOURS]',
  weekendHours: '[WEEKEND AVAILABILITY]',
  whatsapp: null,
  social: [
    { label: '[LINKEDIN]', href: null },
    { label: '[INSTAGRAM]', href: null },
    { label: '[FACEBOOK]', href: null },
    { label: '[OTHER APPROVED CHANNEL]', href: null },
  ],
  mapEmbedUrl: null,
  directionsUrl: null,
};

export const isPlaceholder = (value) => !value || /^\[.*\]$/.test(String(value).trim());

// Profile facts, not claims about current headcount or completed projects.
export const stats = [
  { value: '2008', label: 'Year Incorporated' },
  { value: 'RC 756052', label: 'Company Registration' },
  { value: '12', label: 'Technical Staff' },
  { value: '4', label: 'Administrative Staff' },
];

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Our Work' },
  { to: '/team', label: 'Our Team' },
];
