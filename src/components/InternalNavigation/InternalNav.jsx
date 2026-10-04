import { useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ease } from '../Common/Motion';
import { scrollToSection, useActiveSection } from '../../hooks/useSections';
import './InternalNav.css';

/**
 * Sticky in-page navigation for long pages.
 * items: [{ anchor: 'road-construction', label, section: 'road-construction', onSelect?, isActive?(activeSection) }]
 * - `anchor` becomes the URL hash; `section` is the element id scrolled to.
 * - `onSelect` lets a page react (e.g. Projects sets its grid filter).
 */
export default function InternalNav({ items, label = 'On this page' }) {
  const sections = [...new Set(items.map((i) => i.section))];
  const activeSection = useActiveSection(sections);
  const layoutId = useId();
  const scrollerRef = useRef(null);

  const activeItem =
    items.find((i) => (i.isActive ? i.isActive(activeSection) : i.section === activeSection)) ?? items[0];

  // Keep the active item visible in the horizontally scrolling mobile row.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const el = scroller?.querySelector('[aria-current="true"]');
    if (!scroller || !el) return;
    const left = el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [activeItem?.anchor]);

  // Deep links such as /projects#projects-roads: apply the item, then scroll once the page has rendered.
  // Runs on mount and whenever the router hash changes (including same-page links).
  const { hash } = useLocation();
  const itemsRef = useRef(items);
  itemsRef.current = items;
  useEffect(() => {
    const apply = (anchor) => {
      const item = itemsRef.current.find((i) => i.anchor === anchor);
      if (!item) return undefined;
      item.onSelect?.();
      const t = setTimeout(() => scrollToSection(item.section), 350);
      return () => clearTimeout(t);
    };
    const cleanup = apply(hash.slice(1));
    // Manual edits of the URL hash in the address bar.
    const onHash = () => apply(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHash);
    return () => { cleanup?.(); window.removeEventListener('hashchange', onHash); };
  }, [hash]);

  const select = (item) => (e) => {
    e.preventDefault();
    item.onSelect?.();
    // Let state updates (e.g. filters) render before measuring the target.
    requestAnimationFrame(() => scrollToSection(item.section));
    window.history.replaceState(null, '', `#${item.anchor}`);
  };

  return (
    <nav className="inav" aria-label={label}>
      <div className="inav__scroller" ref={scrollerRef}>
        <ul className="inav__list">
          {items.map((item) => {
            const isActive = item === activeItem;
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  className={`inav__link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={select(item)}
                >
                  {item.label}
                  {isActive && (
                    <motion.span layoutId={layoutId} className="inav__indicator" transition={{ duration: 0.3, ease }} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <span className="inav__fade" aria-hidden="true" />
    </nav>
  );
}
