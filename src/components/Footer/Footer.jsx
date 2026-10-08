import { Link } from 'react-router-dom';
import Logo from '../Common/Logo';
import { Reveal } from '../Common/Motion';
import { company, navLinks, isPlaceholder } from '../../data/company';
import './Footer.css';

const footerNav = [...navLinks, { to: '/contact', label: 'Contact' }];

/** One footer, shared by every page. */
export default function Footer() {
  return (
    <footer className="site-footer section--ink on-dark">
      <div className="container">
        <Reveal type="fade" className="site-footer__top">
          <div className="site-footer__brand">
            <Logo theme="dark" />
          </div>
          <div className="site-footer__cols">
            <nav aria-label="Footer">
              <h2 className="t-label muted site-footer__title">Navigation</h2>
              <ul className="site-footer__list site-footer__list--nav">
                {footerNav.map((l) => (
                  <li key={l.to}><Link to={l.to} className="site-footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="t-label muted site-footer__title">Contact</h2>
              <ul className="site-footer__list">
                <li><a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="site-footer__link">{company.phone}</a></li>
                <li><a href={`mailto:${company.email}`} className="site-footer__link">{company.email}</a></li>
                <li><a href={`mailto:${company.emailSecondary}`} className="site-footer__link">{company.emailSecondary}</a></li>
                <li>{company.address}</li>
              </ul>
            </div>
            <div>
              <h2 className="t-label muted site-footer__title">Follow</h2>
              <ul className="site-footer__list">
                {company.social.slice(0, 3).map((s) => (
                  <li key={s.label}>
                    {s.href && !isPlaceholder(s.href) ? (
                      <a href={s.href} className="site-footer__link" target="_blank" rel="noopener noreferrer">{s.label}</a>
                    ) : (
                      <span>{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <div className="site-footer__bottom">
          <p className="t-caption muted">© {new Date().getFullYear()} {company.name} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
