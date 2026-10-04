import SectionLabel from './SectionLabel';
import { Reveal } from './Motion';

/** Section intro: eyebrow + heading (left) with optional supporting copy or note (right). */
export default function SectionHead({ label, title, aside, note, theme = 'light', id, children, titleClass = 't-h1' }) {
  return (
    <div className="section-head section-head--split">
      <Reveal className="section-head__title">
        {label && <SectionLabel theme={theme}>{label}</SectionLabel>}
        <h2 id={id} className={titleClass}>{title}</h2>
      </Reveal>
      {(aside || note || children) && (
        <Reveal delay={0.1} className={aside ? 'section-head__aside' : 'section-head__note'}>
          {aside || note || children}
        </Reveal>
      )}
    </div>
  );
}
