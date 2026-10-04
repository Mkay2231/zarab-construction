import { Link } from 'react-router-dom';
import './common.css';

/** TEMPORARY text-only lockup — replace with the official Zarab logo when supplied. */
export default function Logo({ theme = 'light', linked = true }) {
  const content = (
    <span className={`logo logo--${theme}`}>
      <span className="logo__word">ZARAB</span>
      <span className="logo__divider" aria-hidden="true" />
      <span className="logo__desc">
        CONSTRUCTION
        <br />
        COMPANY LTD.
      </span>
    </span>
  );
  if (!linked) return content;
  return (
    <Link to="/" className="logo-link" aria-label="Zarab Construction Company Ltd. — Home">
      {content}
    </Link>
  );
}
