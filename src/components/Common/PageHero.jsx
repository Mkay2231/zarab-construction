import Breadcrumb from './Breadcrumb';
import SectionLabel from './SectionLabel';
import Media from './Media';
import { HeroItem } from './Motion';
import './common.css';

/**
 * Inner-page split hero (Services, Projects, Team, Contact):
 * breadcrumb, eyebrow, h1, body, actions (left) + large image (right).
 */
export default function PageHero({ id, crumb, eyebrow, title, body, actions, media, extra, ratio = '4 / 3' }) {
  return (
    <section id={id} className="page-hero section--bg" aria-labelledby={`${id}-title`}>
      <div className="container page-hero__grid">
        <div className="page-hero__content">
          <HeroItem step="eyebrow"><Breadcrumb current={crumb} /></HeroItem>
          <HeroItem step="eyebrow"><SectionLabel rule>{eyebrow}</SectionLabel></HeroItem>
          <HeroItem as="h1" step="heading" id={`${id}-title`} className="t-display-l">{title}</HeroItem>
          <HeroItem as="p" step="body" className="t-body-l muted page-hero__body">{body}</HeroItem>
          <HeroItem step="actions" className="page-hero__actions">{actions}</HeroItem>
          {extra && <HeroItem step="actions">{extra}</HeroItem>}
        </div>
        <HeroItem step="image" className="page-hero__media">
          <span className="accent-bar" aria-hidden="true" />
          <Media ratio={ratio} priority {...media} />
        </HeroItem>
      </div>
    </section>
  );
}
