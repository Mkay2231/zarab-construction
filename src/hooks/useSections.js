import { useEffect, useState } from 'react';

const cssPx = (name) =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

/** Height of the sticky chrome (global nav + internal nav) used as the scroll offset. */
export const stickyOffset = () => cssPx('--nav-h') + cssPx('--inav-h');

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/** Smoothly scroll so the element's top sits just below the sticky navigation. */
export function scrollToSection(id, { smooth = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset() + 1;
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
  return true;
}

/**
 * Scroll-spy: returns the id of the section currently in view — the last
 * section whose top has passed ~30% down the viewport (below the sticky nav).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = stickyOffset() + window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        // Last section that is actually on screen wins at the very bottom.
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight) current = id;
        }
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
