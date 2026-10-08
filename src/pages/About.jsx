import Seo from '../components/Common/Seo';
import Breadcrumb from '../components/Common/Breadcrumb';
import SectionLabel from '../components/Common/SectionLabel';
import SectionHead from '../components/Common/SectionHead';
import Media from '../components/Common/Media';
import StatItem from '../components/Common/StatItem';
import CTA from '../components/Common/CTA';
import Icon from '../components/Common/Icon';
import Button from '../components/Buttons/Button';
import InternalNav from '../components/InternalNavigation/InternalNav';
import { HeroItem, Reveal, Stagger, RevealItem } from '../components/Common/Motion';
import { LeadershipCard } from '../components/TeamCard/TeamCard';
import Timeline from '../components/Common/Timeline';
import { company } from '../data/company';
import { story, mission, objectives, values, aboutFacts } from '../data/about';
import { leadership } from '../data/team';
import './pages.css';

const navItems = [
  { anchor: 'about-overview', label: 'Overview', section: 'about-overview' },
  { anchor: 'our-story', label: 'Our Story', section: 'our-story' },
  { anchor: 'mission-vision', label: 'Mission & Objectives', section: 'mission-vision' },
  { anchor: 'core-values', label: 'Values', section: 'core-values' },
  { anchor: 'leadership', label: 'Leadership', section: 'leadership' },
  { anchor: 'company-facts', label: 'Company Facts', section: 'company-facts' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Learn more about Zarab Construction Company Ltd., our approach to infrastructure and the people behind the work."
        path="/about"
      />
      <InternalNav items={navItems} label="About sections" />

      {/* 02.1 About Hero */}
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <div className="about-hero__intro">
            <div className="about-hero__heading">
              <HeroItem step="eyebrow"><Breadcrumb current="About" /></HeroItem>
              <HeroItem step="eyebrow"><SectionLabel rule>About Zarab</SectionLabel></HeroItem>
              <HeroItem as="h1" step="heading" id="about-title" className="t-display-l">Building infrastructure with purpose.</HeroItem>
            </div>
            <HeroItem as="p" step="body" className="t-body-l muted">
              Learn more about Zarab Construction Company Ltd., our approach to infrastructure and the people behind the work.
            </HeroItem>
          </div>
          <HeroItem step="image" className="about-hero__media">
            <span className="accent-bar" aria-hidden="true" />
            <Media ratio="16 / 7.5" priority label="[COMPANY / PROJECT IMAGE]" note="Awaiting approved Zarab photography" />
          </HeroItem>
        </div>
      </section>

      {/* 02.2 Company Overview */}
      <section id="about-overview" className="section section--white" aria-labelledby="overview-title">
        <div className="container split">
          <Reveal className="split__head">
            <SectionLabel>Who we are</SectionLabel>
            <h2 id="overview-title" className="t-h1">A construction company focused on building what communities depend on.</h2>
          </Reveal>
          <Reveal delay={0.1} className="split__body stack">
            <p className="t-body-l placeholder">{company.profile}</p>
            <p className="t-body-l">
              Zarab Construction Company Ltd. operates in the construction and civil engineering sector, with a focus on infrastructure such as roads, bridges and related civil works.
            </p>
            <ul className="ruled-list" aria-label="Focus areas">
              {['Roads', 'Bridges', 'Related civil works'].map((f) => (
                <li key={f}><span className="ruled-list__marker" aria-hidden="true" />{f}</li>
              ))}
            </ul>
            <Button href="#our-story" variant="text" icon="arrow">More About Zarab</Button>
          </Reveal>
        </div>
      </section>

      {/* 02.3 Our Story */}
      <section id="our-story" className="section section--bg" aria-labelledby="story-title">
        <div className="container">
          <SectionHead id="story-title" label="Our story" title="From vision to infrastructure." note="Incorporated on 26 June 2008, as recorded in the supplied certificate." />
          <Timeline items={story} />
        </div>
      </section>

      {/* 02.4 Mission & Vision */}
      <section id="mission-vision" className="mv" aria-label="Mission and objectives">
        {[
          { key: 'mission', label: 'Our mission', text: mission, n: '01' },
          { key: 'vision', label: 'Our objectives', text: objectives, n: '02' },
        ].map((p, i) => (
          <div key={p.key} className={`mv__panel mv__panel--${p.key} ${p.key === 'mission' ? 'on-dark' : ''}`}>
            <Reveal delay={i * 0.1} className="mv__statement">
              <SectionLabel theme={p.key === 'mission' ? 'dark' : 'light'} as="h2">{p.label}</SectionLabel>
              <p className="t-h1 placeholder">{p.text}</p>
            </Reveal>
            <div className="mv__meta">
              <span className={`t-label ${p.key === 'mission' ? 'accent-yellow' : 'green'}`}>{p.n}</span>

            </div>
          </div>
        ))}
      </section>

      {/* 02.5 Core Values */}
      <section id="core-values" className="section section--bg" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" label="What guides us" title="Principles behind every project." note="Our commitments to quality, people, communities and the environment." />
          <Stagger className="values" as="ul">
            {values.map((v) => (
              <RevealItem as="li" key={v.number} className="value">
                <span className="t-display-m value__num" aria-hidden="true">{v.number}</span>
                <div className="value__body">
                  <h3 className="t-h3">{v.title}</h3>
                  <p className="t-body-s placeholder">{v.text}</p>
                  <Icon name="arrowRight" size={20} className="value__arrow" />
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 02.6 Leadership Preview */}
      <section id="leadership" className="section section--white" aria-labelledby="leadership-title">
        <div className="container">
          <div className="head-row">
            <SectionHead id="leadership-title" label="Leadership" title="People responsible for moving the work forward." />
            <Reveal className="head-row__link"><Button to="/team" variant="text" icon="arrow">Meet the Full Team</Button></Reveal>
          </div>
          <Stagger className="leaders-row">
            {leadership.slice(0, 3).map((m) => <RevealItem key={m.id}><LeadershipCard member={m} /></RevealItem>)}
          </Stagger>
        </div>
      </section>

      {/* 02.7 Company Facts */}
      <section id="company-facts" className="section section--bg section--tight" aria-labelledby="facts-title">
        <div className="container">
          <div className="head-row">
            <SectionLabel as="h2" id="facts-title">At a glance</SectionLabel>

          </div>
          <Stagger className="stats-grid">
            {aboutFacts.map((s) => <RevealItem key={s.label}><StatItem value={s.value} label={s.label} /></RevealItem>)}
          </Stagger>
        </div>
      </section>

      {/* 02.8 Company Image */}
      <section className="section--white full-bleed" aria-label="Company photograph">
        <Reveal type="image">
          <Media ratio="2 / 1" label="[COMPANY / TEAM / PROJECT PHOTOGRAPH]" note="Awaiting approved Zarab photography" />
        </Reveal>
        <div className="container fig-caption">
          <span className="t-label fig-caption__index">Fig. 01</span>
          <span className="t-caption placeholder">[Image caption / project context]</span>
        </div>
        <div style={{ height: 'var(--section-pad)' }} />
      </section>

      {/* 02.9 CTA */}
      <CTA primary={{ label: 'Contact Zarab', to: '/contact' }} secondary={{ label: 'Explore Our Services', to: '/services' }} />
    </>
  );
}
