import Media from '../Common/Media';
import Icon from '../Common/Icon';
import { categoryLabel } from '../../data/projects';
import './ProjectCard.css';

/**
 * Project grid card. `onView` opens the project in the Project Detail section
 * (no separate project pages exist yet, so there is no fake destination).
 */
export default function ProjectCard({ project, onView, showDescription = true, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const category = project.category ? categoryLabel[project.category] : '[PROJECT TYPE]';
  return (
    <article className="project-card zoom-host nudge-host">
      <div className="zoom-media project-card__media">
        <Media ratio="4 / 3" src={project.image} alt={project.image ? project.name : ''} label="[PROJECT IMAGE]" note="Awaiting approved Zarab project photography" />
      </div>
      <div className="project-card__body">
        <p className="t-label green">{category}</p>
        <H className="t-h3 project-card__title">{project.name}</H>
        <p className="t-body-s muted">{project.location}</p>
        {showDescription && <p className="t-body-s placeholder">{project.description}</p>}
        {onView && (
          <button type="button" className="project-card__link" onClick={() => onView(project)}>
            View Project
            <Icon name="arrowRight" size={20} className="nudge-arrow" />
            <span className="visually-hidden"> — {category}, {project.name}</span>
          </button>
        )}
      </div>
    </article>
  );
}

export function ProjectCardEmpty() {
  return (
    <div className="project-card project-card--empty">
      <p className="t-label muted">[PROJECT SLOT]</p>
      <p className="t-body-s muted">Reserved for an approved Zarab project in this category.</p>
    </div>
  );
}
