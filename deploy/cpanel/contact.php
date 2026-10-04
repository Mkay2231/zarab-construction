<?php
/**
 * Zarab Construction — contact form handler for cPanel shared hosting
 * (Namecheap / GoDaddy). Upload next to index.html in public_html/.
 *
 * Build the site with:
 *   VITE_CONTACT_PROVIDER=endpoint
 *   VITE_CONTACT_ENDPOINT=/contact.php
 *
 * BEFORE GOING LIVE: set RECIPIENT and FROM_ADDRESS below.
 * FROM_ADDRESS should be a mailbox on the site's own domain (e.g.
 * website@yourdomain.com) so the host's mail server accepts it.
 */

const RECIPIENT    = '[RECIPIENT EMAIL]';      // where enquiries are delivered
const FROM_ADDRESS = '[WEBSITE FROM ADDRESS]'; // e.g. website@yourdomain.com
const SUBJECT      = 'New website enquiry — Zarab Construction';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

if (str_starts_with(RECIPIENT, '[') || str_starts_with(FROM_ADDRESS, '[')) {
    respond(500, ['ok' => false, 'error' => 'Contact form is not configured yet']);
}

$raw  = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}

// Honeypot: bots fill this hidden field. Pretend success, send nothing.
if (!empty($data['bot-field'])) {
    respond(200, ['ok' => true]);
}

$clean = static function ($value, int $max = 500): string {
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r", "\0"], '', $value);
    return mb_substr(trim($value), 0, $max);
};

$fullName    = $clean($data['fullName'] ?? '', 120);
$email       = $clean($data['email'] ?? '', 200);
$phone       = $clean($data['phone'] ?? '', 40);
$company     = $clean($data['company'] ?? '', 200);
$projectType = $clean($data['projectType'] ?? '', 80);
$location    = $clean($data['location'] ?? '', 200);
$details     = $clean($data['details'] ?? '', 5000);
$method      = $clean($data['method'] ?? '', 20);
$consent     = ($data['consent'] ?? '') === 'yes';

// Same rules as the browser validation.
if ($fullName === '' || $details === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please complete the required fields']);
}

$lines = [
    'Full name:            ' . $fullName,
    'Email:                ' . $email,
    'Phone:                ' . ($phone ?: '—'),
    'Company/Organisation: ' . ($company ?: '—'),
    'Project type:         ' . ($projectType ?: '—'),
    'Project location:     ' . ($location ?: '—'),
    'Preferred contact:    ' . ($method ?: '—'),
    'Consent to contact:   yes',
    '',
    'Project details:',
    $details,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
];

// Header-injection safe: user input never goes into headers except a validated Reply-To.
$headers = [
    'From: Zarab Website <' . FROM_ADDRESS . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=utf-8',
];

$sent = mail(RECIPIENT, SUBJECT, implode("\n", $lines), implode("\r\n", $headers));

if (!$sent) {
    respond(502, ['ok' => false, 'error' => 'Mail could not be sent']);
}
respond(200, ['ok' => true]);
