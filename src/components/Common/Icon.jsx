// 1.5px line icons — same set as the Figma "Icon/*" components.
const paths = {
  arrowRight: <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />,
  arrowUpRight: <path d="M7 17L17 7M8.5 7H17v8.5" />,
  menu: <path d="M3 8.5h18M3 15.5h18" />,
  close: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  image: (
    <>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="M3.5 15.5l5-5 4 4 2.5-2.5 5.5 5.5" />
    </>
  ),
  phone: <path d="M5 4h3.5l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15 13.5l5 2V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  mail: (
    <>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chevronDown: <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  link: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
};

const large = {
  road: (
    <>
      <path d="M3 29L12 4M29 29L20 4" />
      <path d="M16 6v3M16 13v4.5M16 22v5" />
    </>
  ),
  bridge: (
    <>
      <path d="M2 14h28M2 19h28M6 19v9M26 19v9" />
      <path d="M6 14c3-6 17-6 20 0" />
      <path d="M11 10v4M16 8.5V14M21 10v4" />
    </>
  ),
  civil: <path d="M7 5h18v4h-7v14h7v4H7v-4h7V9H7z" />,
  infrastructure: (
    <>
      <path d="M4 9h24M4 23h24M9 4v24M23 4v24" />
      <path d="M9 9h14v14H9z" />
    </>
  ),
};

export default function Icon({ name, size, className = '', title }) {
  const isLarge = name in large;
  const box = isLarge ? 32 : 24;
  const s = size ?? box;
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${box} ${box}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap={isLarge ? 'square' : 'round'}
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {isLarge ? large[name] : paths[name]}
    </svg>
  );
}
