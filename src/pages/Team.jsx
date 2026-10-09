import { sitePhotos } from '../data/photography';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Seo from '../components/Common/Seo';
import PageHero from '../components/Common/PageHero';
import SectionHead from '../components/Common/SectionHead';
import CTA from '../components/Common/CTA';
import FilterBar from '../components/Common/FilterBar';
import Button from '../components/Buttons/Button';
import InternalNav from '../components/InternalNavigation/InternalNav';
import { Stagger, RevealItem, ease } from '../components/Common/Motion';
import { LeadershipCard, TeamCard } from '../components/TeamCard/TeamCard';
import { leadership, team, teamCategories } from '../data/team';
import './pages.css';

export default function Team() {
  const [filter, setFilter] = useState('All');
  const visible = useMemo(() => (filter === 'All' ? team : team.filter((m) => m.department === filter)), [filter]);
  const [primary, ...supporting] = leadership;

  const navItems = [
    { anchor: 'team-overview', label: 'Overview', section: 'team-overview' },
    { anchor: 'leadership', label: 'Leadership', section: 'leadership' },
    {
      anchor: 'engineering-team', label: 'Staff Directory', section: 'engineering-team',
      onSelect: () => setFilter('All'),
      isActive: (s) => s === 'engineering-team' && filter !== 'Management',
    },
    {
      anchor: 'management', label: 'Management', section: 'engineering-team',
      onSelect: () => setFilter('Management'),
      isActive: (s) => s === 'engineering-team' && filter === 'Management',
    },
  ];

  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the professionals responsible for planning, managing and delivering the work at Zarab Construction Company Ltd."
        path="/team"
      />
      <InternalNav items={navItems} label="Team sections" />

      {/* 05.1 Team Hero */}
      <PageHero
        id="team-overview"
        crumb="Our Team"
        eyebrow="Our team"
        title="The people behind the work."
        body="Meet the professionals responsible for planning, managing and delivering the work at Zarab Construction Company Ltd."
        actions={
          <>
            <Button to="/contact" variant="primary" icon="arrow">Contact Us</Button>
            <Button to="/services" variant="secondary">Explore Our Services</Button>
          </>
        }
        media={sitePhotos.team}
      />

      {/* 05.2 Leadership */}
      <section id="leadership" className="section section--white" aria-labelledby="leadership-title">
        <div className="container">
          <SectionHead id="leadership-title" label="Leadership" title="Leadership with purpose." aside="Meet the leadership team guiding Zarab Construction Company Ltd. and its approach to delivering quality infrastructure." />
          <div className="leaders">
            <RevealItem initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <LeadershipCard member={primary} primary />
            </RevealItem>
            <Stagger className="leaders-row">
              {supporting.map((m) => <RevealItem key={m.id}><LeadershipCard member={m} /></RevealItem>)}
            </Stagger>
          </div>

        </div>
      </section>

      {/* 05.3 Team Grid */}
      <section id="engineering-team" className="section section--bg" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" label="Our people" title="Expertise across every stage of delivery." aside="Zarab's work depends on coordinated expertise across engineering, project delivery, operations and management." />
          {/* Live site: hide categories without enough real personnel once data exists. */}
          <FilterBar options={teamCategories} value={filter} onChange={setFilter} label="Filter team by department" />
          <AnimatePresence mode="wait" initial={false}>
            {visible.length ? (
              <motion.ul key={`grid-${filter}`} className="team-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                {visible.map((m) => (
                  <RevealItem as="li" key={m.id} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                    <TeamCard member={m} />
                  </RevealItem>
                ))}
              </motion.ul>
            ) : (
              <motion.div key={`empty-${filter}`} className="empty-state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <p className="t-h3">Team information coming soon.</p>
                <p className="t-body-m muted">Approved {filter.toLowerCase()} profiles will be added here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 05.4 CTA */}
      <CTA
        heading="Want to work with our team?"
        body="Get in touch with Zarab Construction Company Ltd. to discuss your next infrastructure project."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'View Our Services', to: '/services' }}
      />
    </>
  );
}
