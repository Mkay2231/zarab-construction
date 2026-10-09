import { sitePhotos } from '../data/photography';
import Seo from '../components/Common/Seo';
import PageHero from '../components/Common/PageHero';
import SectionLabel from '../components/Common/SectionLabel';
import SectionHead from '../components/Common/SectionHead';
import Media from '../components/Common/Media';
import StatItem from '../components/Common/StatItem';
import CTA from '../components/Common/CTA';
import Button from '../components/Buttons/Button';
import InternalNav from '../components/InternalNavigation/InternalNav';
import { Reveal, Stagger, RevealItem } from '../components/Common/Motion';
import { ServiceItem } from '../components/ServiceCard/ServiceCard';
import Timeline from '../components/Common/Timeline';
import { scrollToSection } from '../hooks/useSections';
import { services, processSteps } from '../data/services';
import { stats as facts, company } from '../data/company';
import './pages.css';

const navItems = [
  { anchor: 'services-overview', label: 'Overview', section: 'services-overview' },
  { anchor: 'road-construction', label: 'Road Construction', section: 'road-construction' },
  { anchor: 'bridge-construction', label: 'Bridge Construction', section: 'bridge-construction' },
  { anchor: 'civil-engineering', label: 'Civil Engineering', section: 'civil-engineering' },
  { anchor: 'infrastructure-development', label: 'Infrastructure', section: 'infrastructure-development' },
  { anchor: 'our-approach', label: 'Our Approach', section: 'our-approach' },
];



function Caps({ title = 'Capabilities', items, theme }) {
  return (
    <div>
      <p className={`t-label svc__list-title ${theme === 'dark' ? 'accent-yellow' : 'muted'}`}>{title}</p>
      <ul className="caps">
        {items.map((c, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}><span className="caps__marker" aria-hidden="true" /><span className="placeholder">{c}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const [road, bridge, civil, infra] = services;

  return (
    <>
      <Seo
        title="Services"
        description="Road construction, bridge construction, civil engineering and infrastructure development by Zarab Construction Company Ltd."
        path="/services"
      />
      <InternalNav items={navItems} label="Services sections" />

      {/* 03.1 Services Hero */}
      <PageHero
        id="services-hero"
        crumb="Services"
        eyebrow="Our services"
        title="Engineering infrastructure for the way people move."
        body="Explore Zarab Construction Company's core areas of construction and civil engineering expertise."
        actions={
          <>
            <Button to="/contact" variant="primary" icon="arrow">Discuss a Project</Button>
            <Button to="/projects" variant="secondary">View Our Projects</Button>
          </>
        }
        media={sitePhotos.hero}
      />

      {/* 03.2 Services Overview */}
      <section id="services-overview" className="section section--white" aria-labelledby="overview-title">
        <div className="container">
          <SectionHead id="overview-title" label="What we do" title="Our core areas of expertise." aside="Civil engineering, buildings, roads, bridges, water resources, architecture, electrical and mechanical engineering." />
          <Stagger className="service-list" as="div">
            {services.map((s) => (
              <RevealItem key={s.id}>
                <ServiceItem service={s} onSelect={(e) => { e.preventDefault(); scrollToSection(s.id); window.history.replaceState(null, '', `#${s.id}`); }} />
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 03.3 Road Construction — image left */}
      <section id={road.id} className="section section--bg" aria-labelledby="road-title">
        <div className="container svc svc--image-left">
          <Reveal type="image" className="svc__media zoom-host"><div className="zoom-media"><Media ratio="4 / 5" {...sitePhotos.road} /></div></Reveal>
          <Reveal className="svc__content">
            <SectionLabel>{`${road.number} / ${road.title}`}</SectionLabel>
            <h2 id="road-title" className="svc__heading t-display-m">{road.title}</h2>
            <p className="t-body-l placeholder">{road.description}</p>
            <p className="t-body-m placeholder">{road.supporting}</p>
            <Caps items={road.capabilities} />
            <div><Button to="/contact" variant="text" icon="arrow">Discuss a Project</Button></div>
          </Reveal>
        </div>
      </section>

      {/* 03.4 Bridge Construction — wide image + split */}
      <section id={bridge.id} className="section section--white" aria-labelledby="bridge-title">
        <div className="container">
          <Reveal type="image"><Media ratio="21 / 9" {...sitePhotos.bridge} /></Reveal>
          <div className="svc svc--wide-split" style={{ marginTop: 'var(--space-64)' }}>
            <Reveal className="svc__content">
              <SectionLabel>{`${bridge.number} / ${bridge.title}`}</SectionLabel>
              <h2 id="bridge-title" className="svc__heading t-display-m">{bridge.title}</h2>
              <p className="t-body-l placeholder">{bridge.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="svc__content">
              <div className="scope">
                <p className="t-label green">Project scope</p>
                <p className="t-body-l placeholder">{bridge.scope}</p>
              </div>
              <Caps items={bridge.capabilities} />
              <div><Button to="/projects" variant="text" icon="arrow">Explore Projects</Button></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03.5 Civil Engineering — dark, image right */}
      <section id={civil.id} className="section section--ink on-dark" aria-labelledby="civil-title">
        <div className="container svc svc--image-right">
          <Reveal type="image" className="svc__media"><Media ratio="4 / 5" {...sitePhotos.civil} /></Reveal>
          <Reveal className="svc__content">
            <SectionLabel theme="dark">{`${civil.number} / ${civil.title}`}</SectionLabel>
            <h2 id="civil-title" className="svc__heading t-display-m">{civil.title}</h2>
            <p className="t-body-l placeholder">{civil.description}</p>
            <div className="panel">
              <div className="panel__head">
                <p className="t-label accent-yellow">Areas of work</p>

              </div>
              <div className="panel__grid">
                <ul className="caps">{civil.areas.slice(0, 2).map((a, i) => <li key={`a${i}`}><span className="caps__marker" aria-hidden="true" /><span className="placeholder">{a}</span></li>)}</ul>
                <ul className="caps">{civil.areas.slice(2).map((a, i) => <li key={`b${i}`}><span className="caps__marker" aria-hidden="true" /><span className="placeholder">{a}</span></li>)}</ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03.6 Infrastructure Development */}
      <section id={infra.id} className="section section--white" aria-labelledby="infra-title">
        <div className="container">
          <div className="split" style={{ marginBottom: 'var(--space-64)' }}>
            <Reveal className="split__head">
              <SectionLabel>{`${infra.number} / ${infra.title}`}</SectionLabel>
              <h2 id="infra-title" className="t-h1">Infrastructure built for lasting&nbsp;impact.</h2>
            </Reveal>
            <Reveal delay={0.1} className="split__body"><p className="t-body-l placeholder">{infra.description}</p></Reveal>
          </div>
          <Reveal type="image"><Media ratio="16 / 9" label={infra.imageLabel} /></Reveal>
          <Stagger className="blocks" style={{ marginTop: 'var(--space-48)' }}>
            {infra.blocks.map((b) => (
              <RevealItem key={b.title} className="blocks__item">
                <h3 className="t-h3">{b.title}</h3>
                <p className="t-body-m placeholder">{b.text}</p>
              </RevealItem>
            ))}
          </Stagger>

        </div>
      </section>

      {/* 03.7 How We Work */}
      <section id="our-approach" className="section section--bg" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead id="approach-title" label="Our approach" title="Quality throughout the work." note="Clear procedures, consistent standards and continuous improvement." />
          <Timeline items={processSteps.map((s) => ({ ...s, year: null }))} variant="process" />
        </div>
      </section>

      {/* 03.8 Capabilities / Facts */}
      <section className="section section--white" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHead id="capabilities-title" label="At a glance" title="Built around capability." />
          <Stagger className="stats-grid">
            {facts.map((s) => <RevealItem key={s.label}><StatItem value={s.value} label={s.label} /></RevealItem>)}
          </Stagger>
          <Reveal className="credentials">
            <div className="stack" style={{ '--stack': 'var(--space-8)' }}>
              <p className="t-label green">Credentials</p>
              <p className="t-body-l placeholder">{company.legalName} — {company.registrationNumber}</p>
            </div>
            <p className="t-caption muted">Incorporated on {company.incorporated}. Registered with the Corporate Affairs Commission.</p>
          </Reveal>
        </div>
      </section>

      {/* 03.9 CTA */}
      <CTA heading="Have a project in mind?" body="Let's discuss the infrastructure you need to build." primary={{ label: 'Contact Zarab', to: '/contact' }} secondary={{ label: 'View Our Projects', to: '/projects' }} />
    </>
  );
}
