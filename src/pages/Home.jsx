import { useNavigate } from 'react-router-dom';
import Seo from '../components/Common/Seo';
import SectionLabel from '../components/Common/SectionLabel';
import SectionHead from '../components/Common/SectionHead';
import Media from '../components/Common/Media';
import StatItem from '../components/Common/StatItem';
import CTA from '../components/Common/CTA';
import Button from '../components/Buttons/Button';
import { HeroItem, Reveal, Stagger, RevealItem } from '../components/Common/Motion';
import { ServiceCard } from '../components/ServiceCard/ServiceCard';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { TeamCard } from '../components/TeamCard/TeamCard';
import Icon from '../components/Common/Icon';
import { company, stats } from '../data/company';
import { services } from '../data/services';
import { projects, featuredProject } from '../data/projects';
import { team } from '../data/team';
import { principles } from '../data/about';
import './pages.css';

export default function Home() {
  const navigate = useNavigate();
  const openProjects = () => navigate('/projects#projects-all');

  return (
    <>
      <Seo
        title="Road, Bridge & Civil Engineering Construction"
        description="Zarab Construction Company Ltd. delivers road, bridge and civil engineering solutions designed around quality, reliability and lasting impact."
        path="/"
      />

      {/* 01.1 Hero */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <div className="home-hero__intro">
            <HeroItem step="eyebrow"><SectionLabel rule>Building the infrastructure of tomorrow</SectionLabel></HeroItem>
            <HeroItem step="heading" className="home-hero__headings">
              <h1 id="home-title" className="t-display-l">Building Roads. Connecting Communities.</h1>
              <p className="t-h3 green home-hero__sub">Engineering Infrastructure That Moves People Forward.</p>
            </HeroItem>
            <HeroItem as="p" step="body" className="t-body-l muted home-hero__body">
              Zarab Construction Company Ltd. delivers road, bridge and civil engineering solutions designed around quality, reliability and lasting impact.
            </HeroItem>
            <HeroItem step="actions" className="home-hero__actions">
              <Button to="/services" variant="primary" icon="arrow">Explore Our Services</Button>
              <Button to="/projects" variant="secondary">View Our Projects</Button>
            </HeroItem>
          </div>
          <HeroItem as="ul" step="actions" className="home-hero__disciplines" aria-label="Disciplines">
            {services.map((s) => <li key={s.id} className="t-caption">{s.title}</li>)}
          </HeroItem>
        </div>
        <HeroItem step="image" className="home-hero__media">
          <Media fill priority label="[PROJECT IMAGE]" note="Awaiting approved Zarab project photography" />
          <span className="home-hero__accent" aria-hidden="true" />
        </HeroItem>
      </section>

      {/* 01.2 Company Introduction */}
      <section className="section section--white" aria-labelledby="intro-title">
        <div className="container split rule-top split--padded">
          <Reveal className="split__head">
            <SectionLabel>Who we are</SectionLabel>
            <h2 id="intro-title" className="t-h1">Building with purpose. Engineering for impact.</h2>
          </Reveal>
          <Reveal delay={0.1} className="split__body stack">
            <p className="t-body-l placeholder">{company.profile}</p>
            <p className="t-body-l">
              Zarab Construction Company Ltd. is a construction and civil engineering company focused on delivering infrastructure projects across roads, bridges and related civil works.
            </p>
            <Button to="/about" variant="text" icon="arrow">Learn More</Button>
          </Reveal>
        </div>
      </section>

      {/* 01.3 Services Preview */}
      <section className="section section--bg" aria-labelledby="services-preview-title">
        <div className="container">
          <SectionHead id="services-preview-title" label="What we do" title="Engineering solutions built for real‑world infrastructure." />
          <Stagger className="service-grid">
            {services.map((s) => (
              <RevealItem key={s.id}><ServiceCard service={s} /></RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 01.4 Projects Preview */}
      <section className="section section--white" aria-labelledby="projects-preview-title">
        <div className="container">
          <div className="head-row">
            <SectionHead id="projects-preview-title" label="Selected projects" title="Infrastructure that speaks for itself." />
            <Reveal className="head-row__link"><Button to="/projects" variant="text" icon="arrow">View All Projects</Button></Reveal>
          </div>
          <article className="feature zoom-host nudge-host">
            <Reveal type="image" className="feature__media zoom-media">
              <Media ratio="3 / 2" label="[PROJECT IMAGE]" note="Awaiting approved Zarab project photography" />
            </Reveal>
            <Reveal delay={0.1} className="feature__panel">
              <div className="feature__head">
                <p className="t-label green">Project 01</p>
                <Icon name="arrowUpRight" className="nudge-arrow nudge-arrow--up" />
              </div>
              <h3 className="t-h2">{featuredProject.name}</h3>
              <dl className="meta">
                <div><dt>Location</dt><dd>{featuredProject.location}</dd></div>
                <div><dt>Project type</dt><dd>[Project Type]</dd></div>
                <div><dt>Status</dt><dd>[Project Status]</dd></div>
              </dl>
              <Button to="/projects#projects-featured" variant="text" icon="arrow">View Project</Button>
            </Reveal>
          </article>
          <Stagger className="project-grid project-grid--preview">
            {projects.slice(0, 3).map((p) => (
              <RevealItem key={p.id}>
                <ProjectCard project={{ ...p, category: null }} showDescription={false} onView={openProjects} />
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 01.5 Why Zarab */}
      <section className="section section--ink on-dark" aria-labelledby="why-title">
        <div className="container">
          <SectionHead id="why-title" theme="dark" label="Why Zarab" title="Built around quality, responsibility and execution." note="Our company profile sets out commitments to quality, worker wellbeing, client support and professional expertise." />
          <Stagger as="ol" className="principles">
            {principles.map((p) => (
              <RevealItem as="li" key={p.number} className="principle">
                <span className="t-label accent-yellow">{p.number}</span>
                <h3 className="t-h1 principle__title">{p.title}</h3>
                <p className="t-body-l placeholder">{p.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 01.6 Company Statistics */}
      <section className="section section--white section--tight" aria-label="Company statistics">
        <div className="container">
          <Stagger className="stats-grid">
            {stats.map((s) => <RevealItem key={s.label}><StatItem value={s.value} label={s.label} /></RevealItem>)}
          </Stagger>
          <p className="placeholder-note stats-note">Company registration and staff listings are drawn from the supplied profile; staff counts describe that document.</p>
        </div>
      </section>

      {/* 01.7 Team Preview */}
      <section className="section section--bg" aria-labelledby="team-preview-title">
        <div className="container">
          <div className="head-row">
            <SectionHead id="team-preview-title" label="Our people" title="The people behind the work." />
            <Reveal className="head-row__link"><Button to="/team" variant="text" icon="arrow">Meet Our Team</Button></Reveal>
          </div>
        </div>
        <Stagger className="carousel" role="list" aria-label="Team preview">
          {team.slice(0, 3).map((m) => (
            <RevealItem key={m.id} className="carousel__item" role="listitem">
              <TeamCard member={m} showDepartment={false} showBio={false} />
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* 01.8 CTA */}
      <CTA />
    </>
  );
}
