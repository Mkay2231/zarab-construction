import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Common/Logo';
import Icon from '../Common/Icon';
import Button from '../Buttons/Button';
import { ease } from '../Common/Motion';
import { company, navLinks } from '../../data/company';
import './Navigation.css';

const mobileLinks = [...navLinks, { to: '/contact', label: 'Contact' }];

export default function Navigation() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Header turns white with a hairline once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock scroll, Escape to close, keep focus inside the panel while open.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panelRef.current?.querySelector('a, button');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll('a, button')];
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); toggleRef.current?.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); toggleRef.current?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const isContact = pathname === '/contact';

  return (
    <motion.header
      className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}
      // Opacity only: a transform here would trap the fixed mobile menu inside the header.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="container site-header__bar">
        <Logo />

        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-desktop__list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className="nav-link">
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span layoutId="nav-indicator" className="nav-link__indicator" transition={{ duration: 0.35, ease }} />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          to="/contact"
          variant="primary"
          className={`site-header__cta ${isContact ? 'is-current' : ''}`}
          aria-current={isContact ? 'page' : undefined}
        >
          Contact Us
        </Button>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span className="menu-toggle__line" animate={open ? { y: 3.5, rotate: 45 } : { y: -3.5, rotate: 0 }} transition={{ duration: 0.25, ease }} />
          <motion.span className="menu-toggle__line" animate={open ? { y: -3.5, rotate: -45 } : { y: 3.5, rotate: 0 }} transition={{ duration: 0.25, ease }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            <nav aria-label="Mobile">
              <motion.ul
                className="mobile-menu__list"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {mobileLinks.map((link) => (
                  <motion.li key={link.to} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.4, ease }}>
                    <NavLink to={link.to} end={link.to === '/'} className="mobile-menu__link nudge-host">
                      <span className="t-h2">{link.label}</span>
                      <Icon name="arrowRight" className="nudge-arrow" />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <div className="mobile-menu__footer">
              <Button to="/contact" variant="primary" full icon="arrow">Contact Us</Button>
              <p className="t-caption muted">{company.phone} · {company.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
