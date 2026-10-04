import Button from '../Buttons/Button';
import { Reveal } from './Motion';
import './common.css';

/** Shared green closing band (Figma: CTA component). The final character renders in yellow. */
export default function CTA({
  heading = "Let's build what matters.",
  body = "Have an infrastructure project in mind? Let's start a conversation.",
  primary = { label: 'Contact Zarab', to: '/contact' },
  secondary = { label: 'View Our Projects', to: '/projects' },
}) {
  const last = heading.slice(-1);
  const head = heading.slice(0, -1);
  const { label: pLabel, ...pRest } = primary;
  const { label: sLabel, ...sRest } = secondary;
  return (
    <section className="cta section--green on-dark" aria-labelledby="cta-heading">
      <div className="container cta__inner">
        <Reveal className="cta__copy">
          <h2 id="cta-heading" className="t-display-m">
            {head}
            <span className="accent-yellow">{last}</span>
          </h2>
          <p className="t-body-l muted">{body}</p>
        </Reveal>
        <Reveal delay={0.12} className="cta__actions">
          <Button variant="primary" theme="dark" icon="arrow" {...pRest}>{pLabel}</Button>
          <Button variant="secondary" theme="dark" {...sRest}>{sLabel}</Button>
        </Reveal>
      </div>
    </section>
  );
}
