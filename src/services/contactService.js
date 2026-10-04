/**
 * Contact form submission — the single integration point for enquiries.
 *
 * Choose a provider at build time with VITE_CONTACT_PROVIDER (see .env.example):
 *
 *  - "netlify"  → Netlify Forms (form name "enquiry", registered in index.html).
 *                 Set in netlify.toml for Netlify builds.
 *  - "endpoint" → POST JSON to VITE_CONTACT_ENDPOINT, e.g. /contact.php on
 *                 Namecheap / GoDaddy cPanel hosting (see deploy/cpanel/).
 *  - unset      → MOCK submission: nothing is sent anywhere. Used for local
 *                 development. Add `?simulate=error` to preview the failure state.
 */
const PROVIDER = import.meta.env.VITE_CONTACT_PROVIDER;
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export const contactProvider =
  PROVIDER === 'netlify' ? 'netlify' : PROVIDER === 'endpoint' && ENDPOINT ? 'endpoint' : 'mock';

export const isMockSubmission = contactProvider === 'mock';

const toFormFields = (data) =>
  Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, typeof v === 'boolean' ? (v ? 'yes' : 'no') : String(v ?? '')]),
  );

async function submitToNetlify(data) {
  const body = new URLSearchParams({ 'form-name': 'enquiry', ...toFormFields(data) });
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Netlify Forms responded with ${res.status}`);
  return { ok: true };
}

async function submitToEndpoint(data) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(toFormFields(data)),
  });
  if (!res.ok) throw new Error(`Enquiry endpoint responded with ${res.status}`);
  const json = await res.json().catch(() => ({}));
  if (json.ok === false) throw new Error(json.error || 'Enquiry endpoint rejected the submission');
  return { ok: true };
}

async function submitMock() {
  await new Promise((r) => setTimeout(r, 1400));
  if (new URLSearchParams(window.location.search).get('simulate') === 'error') {
    throw new Error('Simulated submission failure');
  }
  return { ok: true, mock: true };
}

export function submitEnquiry(data) {
  if (contactProvider === 'netlify') return submitToNetlify(data);
  if (contactProvider === 'endpoint') return submitToEndpoint(data);
  return submitMock();
}
