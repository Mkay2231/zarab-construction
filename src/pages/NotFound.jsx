import Seo from '../components/Common/Seo';
import SectionLabel from '../components/Common/SectionLabel';
import Button from '../components/Buttons/Button';
import { HeroItem } from '../components/Common/Motion';
import './pages.css';

export default function NotFound() {
  return (
    <section className="section section--bg" aria-labelledby="nf-title" style={{ minHeight: '60vh' }}>
      <Seo title="Page not found" description="The page you were looking for could not be found." />
      <div className="container stack">
        <HeroItem step="eyebrow"><SectionLabel rule>Page not found</SectionLabel></HeroItem>
        <HeroItem as="h1" step="heading" id="nf-title" className="t-display-m">We couldn&apos;t find that page.</HeroItem>
        <HeroItem as="p" step="body" className="t-body-l muted">The link may be out of date. Use the navigation above or return home.</HeroItem>
        <HeroItem step="actions"><Button to="/" variant="primary" icon="arrow">Back to Home</Button></HeroItem>
      </div>
    </section>
  );
}
