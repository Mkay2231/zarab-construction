import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Seo from '../components/Common/Seo';
import PageHero from '../components/Common/PageHero';
import SectionLabel from '../components/Common/SectionLabel';
import SectionHead from '../components/Common/SectionHead';
import Media from '../components/Common/Media';
import CTA from '../components/Common/CTA';
import FilterBar from '../components/Common/FilterBar';
import Button from '../components/Buttons/Button';
import InternalNav from '../components/InternalNavigation/InternalNav';
import { Reveal, ease } from '../components/Common/Motion';
import ProjectCard, { ProjectCardEmpty } from '../components/ProjectCard/ProjectCard';
import { scrollToSection } from '../hooks/useSections';
import { projects, projectCategories, featuredProject, categoryLabel } from '../data/projects';
import './pages.css';

const navFilters = ['Roads', 'Bridges', 'Civil Works'];

function Metadata({ project }) {
  const rows = [
    ['Project Type', project.type ?? (project.category ? categoryLabel[project.category] : '[Road / Bridge / Civil Works / Infrastructure]')],
    ['Location', project.location],
    ['Year', project.year],
    ['Status', project.status],
    ['Client', project.client],
  ];
  return (
    <dl className="meta meta--strong">
      {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(featuredProject);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const counts = useMemo(() => {
    const c = { All: projects.length };
    for (const cat of projectCategories.slice(1)) c[cat] = projects.filter((p) => p.category === cat).length;
    return c;
  }, []);

  // Approved order: Featured Project → All Projects → Roads → Bridges → Civil Works.
  // Category items scroll to the grid AND apply the matching filter.
  const navItems = [
    { anchor: 'projects-featured', label: 'Featured Project', section: 'projects-featured' },
    {
      anchor: 'projects-all', label: 'All Projects', section: 'projects-all',
      onSelect: () => setFilter('All'),
      isActive: (s) => s === 'projects-all' && !navFilters.includes(filter),
    },
    ...navFilters.map((cat) => ({
      anchor: `projects-${cat === 'Civil Works' ? 'civil' : cat.toLowerCase()}`,
      label: cat,
      section: 'projects-all',
      onSelect: () => setFilter(cat),
      isActive: (s) => s === 'projects-all' && filter === cat,
    })),
  ];

  const changeFilter = (cat) => {
    setFilter(cat);
    const anchor = { All: 'projects-all', Roads: 'projects-roads', Bridges: 'projects-bridges', 'Civil Works': 'projects-civil' }[cat];
    window.history.replaceState(null, '', anchor ? `#${anchor}` : window.location.pathname);
  };

  const viewProject = (p) => {
    setSelected(p);
    requestAnimationFrame(() => scrollToSection('project-detail'));
  };

  return (
    <>
      <Seo
        title="Projects"
        description="Explore selected projects by Zarab Construction Company Ltd. across roads, bridges, civil works and infrastructure development."
        path="/projects"
      />
      <InternalNav items={navItems} label="Projects sections" />

      {/* 04.1 Projects Hero */}
      <PageHero
        id="projects-hero"
        crumb="Projects"
        eyebrow="Our projects"
        title="Infrastructure built to make a difference."
        body="Explore selected projects by Zarab Construction Company Ltd. across roads, bridges, civil works and infrastructure development."
        ratio="4 / 5"
        actions={
          <>
            <Button to="/contact" variant="primary" icon="arrow">Discuss a Project</Button>
            <Button to="/contact" variant="secondary">Contact Zarab</Button>
          </>
        }
        media={{ label: '[PROJECT / INFRASTRUCTURE IMAGE]', note: 'Awaiting approved Zarab project photography' }}
      />

      {/* 04.2 Featured Project */}
      <section id="projects-featured" className="section section--white" aria-labelledby="featured-title">
        <div className="container">
          <SectionHead id="featured-title" label="Featured project" title="A closer look at our work." aside="Explore one of Zarab Construction Company Ltd.'s projects in greater detail." />
          <div className="case">
            <Reveal type="image" className="case__images">
              <Media ratio="3 / 2" src={featuredProject.image} label="[FEATURED PROJECT IMAGE]" note="Awaiting approved Zarab project photography" />
              <div className="case__thumbs">
                <Media ratio="3 / 2" label="[PROJECT IMAGE 02]" note="Awaiting approved photography" />
                <Media ratio="3 / 2" label="[PROJECT IMAGE 03]" note="Awaiting approved photography" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="case__panel">
              <p className="t-label green tag">Case study</p>
              <h3 className="t-h1">{featuredProject.name}</h3>
              <p className="t-body-l placeholder">{featuredProject.description}</p>
              <Metadata project={featuredProject} />
              <div><Button variant="primary" icon="arrow" onClick={() => viewProject(featuredProject)}>View Project</Button></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04.3 Project Grid */}
      <section id="projects-all" className="section section--bg" aria-labelledby="grid-title">
        <div className="container">
          <SectionHead id="grid-title" label="All projects" title="Selected work" aside="A selection of Zarab Construction Company Ltd.'s work across infrastructure and civil engineering." />
          <FilterBar options={projectCategories} value={filter} onChange={changeFilter} label="Filter projects by category" counts={counts} />
          <p className="visually-hidden" aria-live="polite">
            {filter === 'All' ? `Showing all ${visible.length} projects` : `Showing ${visible.length} ${filter} project${visible.length === 1 ? '' : 's'}`}
          </p>
          <LayoutGroup>
            <motion.ul className="project-grid" layout>
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <ProjectCard project={p} onView={viewProject} />
                  </motion.li>
                ))}
                {filter !== 'All' && (
                  <motion.li key={`empty-${filter}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <ProjectCardEmpty />
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>

      {/* 04.4 Project Detail */}
      <section id="project-detail" className="section section--white" aria-labelledby="detail-title">
        <div className="container">
          <Reveal className="section-head__title" style={{ marginBottom: 'var(--space-48)' }}>
            <SectionLabel>Project detail</SectionLabel>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2 key={selected.id} id="detail-title" className="t-display-m" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                {selected.name}
              </motion.h2>
            </AnimatePresence>
          </Reveal>
          <Reveal type="image" className="gallery">
            <Media label="[PROJECT IMAGE 01]" ratio="16 / 10" />
            <div className="gallery__side">
              <Media label="[PROJECT IMAGE 02]" note="Awaiting photo" ratio="4 / 3" />
              <Media label="[PROJECT IMAGE 03]" note="Awaiting photo" ratio="4 / 3" />
            </div>
          </Reveal>
          <div className="detail">
            <Reveal className="detail__blocks">
              <p className="t-body-l placeholder">[Approved detailed project description]</p>
              {[['Scope of Work', selected.scope], ['Project Overview', selected.overview], ['Project Outcome', selected.outcome]].map(([t, v]) => (
                <div key={t} className="detail__block">
                  <h3 className="t-h3">{t}</h3>
                  <p className="t-body-m placeholder">{v}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.1} className="stack" style={{ '--stack': 'var(--space-32)' }}>
              <Metadata project={selected} />
              <p className="placeholder-note">Outcome and impact statements appear only once approved by Zarab.</p>
              <Button to="/contact" variant="text" icon="arrow">Discuss a Project</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04.5 CTA */}
      <CTA
        heading="Have an infrastructure project in mind?"
        body="Let's discuss how Zarab Construction Company Ltd. can support your next project."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </>
  );
}
