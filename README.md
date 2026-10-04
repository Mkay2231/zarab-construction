# Zarab Construction Company Ltd.

Company website for **Zarab Construction Company Ltd.** — road construction, bridge construction, civil engineering and infrastructure development.

Built from the approved Zarab Figma design system. All company information that has not yet been supplied (contact details, projects, team, statistics, photography) is shown as clearly bracketed placeholders, e.g. `[PHONE NUMBER]`, `[PROJECT NAME]`, `[XX]+`. Nothing is invented.

## Tech stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- JavaScript (ES modules)
- CSS (custom properties / design tokens — no CSS framework)
- [React Router](https://reactrouter.com) — client-side routing
- [Framer Motion](https://motion.dev) — page transitions, scroll reveals, filter/layout animation

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/projects` | Projects (functional category filtering) |
| `/team` | Our Team |
| `/contact` | Contact (validated enquiry form) |

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build      # outputs a static site to /dist
npm run preview    # serve the production build locally
```

## Project structure

```
src/
├── components/      Navigation, Footer, Buttons, InternalNavigation, cards, Forms, Common
├── data/            company.js, services.js, projects.js, team.js, about.js  ← edit content here
├── hooks/           scroll-spy + section scrolling
├── pages/           Home, About, Services, Projects, Team, Contact
├── services/        contactService.js  ← form submission integration point
└── styles/          variables.css (tokens), globals.css, animations.css
public/
├── images/          hero/ projects/ services/ team/ about/ general/  ← approved photography
├── favicon/
├── .htaccess        Apache rewrite (Namecheap / GoDaddy)
└── _redirects       Netlify rewrite
```

### Replacing placeholder content

- **Company details** — `src/data/company.js` (phone, email, address, hours, social links, WhatsApp, map embed URL). Real `tel:`, `mailto:` and directions links switch on automatically once a placeholder is replaced.
- **Services / projects / team** — the matching file in `src/data/`.
- **Photography** — add files to `public/images/...` and set the `image` / `photo` field (e.g. `"/images/projects/bridge-01.jpg"`). Components render the photo instead of the placeholder.
- **Statistics** — replace `[XX]+` with real figures; numeric values animate (count up) automatically.

### Contact form

The form validates in the browser and shows loading / success / failure states. Where it sends enquiries is chosen at build time with `VITE_CONTACT_PROVIDER` (see `.env.example`):

| Provider | Used for | How it works |
| --- | --- | --- |
| `netlify` | Netlify hosting (set in `netlify.toml`) | Netlify Forms stores each enquiry (form name `enquiry`) and can email it — Netlify dashboard → Forms → Form notifications. |
| `endpoint` | Namecheap / GoDaddy cPanel hosting | POSTs JSON to `VITE_CONTACT_ENDPOINT`, e.g. `/contact.php` from [`deploy/cpanel/`](deploy/cpanel/README.md). |
| *(empty)* | Local development | Mock submission — nothing is sent anywhere. |

- A hidden honeypot field (`bot-field`) filters basic spam on both real providers.
- Preview the failure state locally with `/contact?simulate=error`.

## Deployment

`npm run build` produces a standard static site in `dist/` that works on any host. Because routes like `/about` are handled client-side, the host must serve `index.html` for unknown paths — rewrite files for common hosts are included:

- **Vercel** — import the repo; `vercel.json` is included. Build command `npm run build`, output `dist`.
- **Netlify** — import the repo; `netlify.toml` sets the build, rewrites, headers and the Netlify Forms contact provider.
- **Traditional hosting (Namecheap / GoDaddy cPanel, Apache)** — follow [`deploy/cpanel/README.md`](deploy/cpanel/README.md): build with the `endpoint` provider, then upload the *contents* of `dist/` (including the hidden `.htaccess` file) plus `contact.php` to `public_html/`. If the host uses Nginx instead of Apache, add `try_files $uri /index.html;`.

## Accessibility & motion

- Semantic landmarks and headings (one `<h1>` per page), skip link, visible focus states, labelled form fields with text + icon errors, 44px touch targets.
- `prefers-reduced-motion` is respected: Framer Motion skips transform animations and CSS transitions are reduced.

---

© [Year] Zarab Construction Company Ltd. All rights reserved.
