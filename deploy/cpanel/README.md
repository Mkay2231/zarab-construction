# Deploying to Namecheap / GoDaddy (cPanel shared hosting)

1. **Configure the contact form handler** — edit `contact.php` and set:
   - `RECIPIENT` — the inbox that should receive enquiries.
   - `FROM_ADDRESS` — a mailbox on the website's own domain (create it in cPanel → Email Accounts), e.g. `website@yourdomain.com`.

2. **Build for cPanel** — create `.env` in the project root:

   ```
   VITE_CONTACT_PROVIDER=endpoint
   VITE_CONTACT_ENDPOINT=/contact.php
   ```

   then run `npm run build`.

3. **Upload** (cPanel → File Manager, or FTP) into `public_html/`:
   - everything *inside* `dist/` (including the hidden `.htaccess`)
   - `deploy/cpanel/contact.php`

4. **Point the domain** at the hosting account (usually automatic when the domain and hosting are with the same provider) and enable free SSL (cPanel → SSL/TLS Status → AutoSSL).

5. **Test** — send one enquiry from `/contact` and confirm it arrives. If it doesn't, check cPanel → Track Delivery, and that `FROM_ADDRESS` exists on the domain.

Requires PHP 8.0+ (default on current Namecheap / GoDaddy plans).
