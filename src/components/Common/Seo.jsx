import { company } from '../../data/company';

/* React 19 hoists <title>/<meta> into <head>. Descriptions only state what the
   company does (roads, bridges, civil engineering) — no unverified claims. */
export default function Seo({ title, description, path = '/' }) {
  const full = title ? `${title} | ${company.name}` : company.name;
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <meta name="twitter:card" content="summary" />
    </>
  );
}
