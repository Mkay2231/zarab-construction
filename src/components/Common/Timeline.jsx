import { Stagger, RevealItem } from './Motion';

/**
 * Horizontal (desktop) / vertical (mobile) timeline with yellow markers.
 * Used for Our Story (with [YEAR]) and How We Work (large step numbers).
 */
export default function Timeline({ items, variant = '' }) {
  return (
    <Stagger as="ol" className={`timeline ${variant}`}>
      {items.map((s) => (
        <RevealItem as="li" key={s.number} className="timeline__item">
          <span className="t-label green timeline__num">{s.number}</span>
          <span className="timeline__rail" aria-hidden="true">
            <span className="timeline__marker" />
            <span className="timeline__line" />
          </span>
          <div className="timeline__content">
            <p className="t-display-m timeline__year" aria-hidden={!s.year || undefined}>{s.year ?? s.number}</p>
            <h3 className="t-h3">{s.title}</h3>
            <p className="t-body-s placeholder">{s.text}</p>
          </div>
        </RevealItem>
      ))}
    </Stagger>
  );
}
