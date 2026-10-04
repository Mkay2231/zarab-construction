import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

/** Statistic. Real numbers ("120+") count up once in view; placeholders like "[XX]+" never animate. */
export default function StatItem({ value, label, size = 'large' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(String(value));
  const [display, setDisplay] = useState(match && !reduce ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match || reduce || !inView) return undefined;
    const target = Number(match[1]);
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${match[2]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className={`stat stat--${size}`}>
      <span className="stat__accent" aria-hidden="true" />
      <p className={`stat__value ${size === 'large' ? 't-display-m' : 't-h1'}`}>{display}</p>
      <p className={`stat__label ${size === 'large' ? 't-body-m' : 't-body-s'}`}>{label}</p>
    </div>
  );
}
