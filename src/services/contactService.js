/**
 * Contact form submission — the single integration point for a real backend.
 *
 * - If VITE_CONTACT_ENDPOINT is set (see .env.example), the enquiry is POSTed
 *   as JSON to that URL (form service, serverless function, PHP mail script…).
 * - Otherwise a MOCK submission runs: nothing is sent anywhere. It resolves
 *   after a short delay so the loading/success states can be reviewed.
 *   Add `?simulate=error` to the URL to preview the failure state.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export const isMockSubmission = !ENDPOINT;

export async function submitEnquiry(data) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Enquiry failed with status ${res.status}`);
    return { ok: true };
  }

  await new Promise((r) => setTimeout(r, 1400));
  const simulateError = new URLSearchParams(window.location.search).get('simulate') === 'error';
  if (simulateError) throw new Error('Simulated submission failure');
  return { ok: true, mock: true };
}
