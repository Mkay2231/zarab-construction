import Media from '../Common/Media';
import Icon from '../Common/Icon';
import './TeamCard.css';

const portrait = { label: '[PROFILE PHOTO]', note: 'Awaiting approved team photography' };

/**
 * Team directory card. Structural placeholder until Zarab supplies approved people.
 * "View Profile" renders only when a real profile URL exists — never a fake destination.
 */
export function TeamCard({ member, showDepartment = true, showBio = true }) {
  return (
    <article className="team-card zoom-host">
      <div className="zoom-media"><Media ratio="4 / 5" src={member.photo} alt={member.photo ? member.name : ''} {...portrait} /></div>
      <div className="team-card__body">
        {showDepartment && <p className="t-label green">{member.department ?? '[DEPARTMENT]'}</p>}
        <h3 className="t-h3 team-card__name">{member.name}</h3>
        <p className="t-body-s">{member.role}</p>
        {showBio && <p className="t-body-s placeholder">{member.bio}</p>}
        {member.profileUrl && (
          <a href={member.profileUrl} className="team-card__link nudge-host">
            View Profile <Icon name="arrowRight" size={20} className="nudge-arrow" />
          </a>
        )}
      </div>
    </article>
  );
}

/** Leadership profile — `primary` is the large editorial layout. */
export function LeadershipCard({ member, primary = false }) {
  return (
    <article className={`leader-card zoom-host ${primary ? 'leader-card--primary' : ''}`}>
      <div className="zoom-media leader-card__media"><Media ratio="4 / 5" src={member.photo} alt={member.photo ? member.name : ''} {...portrait} /></div>
      <div className="leader-card__body">
        {primary && (
          <p className="leader-card__tag t-label"><span aria-hidden="true" className="leader-card__marker" />Leadership</p>
        )}
        <h3 className={primary ? 't-display-m leader-card__name' : 't-h3 leader-card__name'}>{member.name}</h3>
        <p className={primary ? 't-body-l green' : 't-body-s green'}>{member.role}</p>
        <p className={`placeholder ${primary ? 't-body-l' : 't-body-s'}`}>{member.bio}</p>
        {member.qualification && <p className="t-body-s"><span className="t-label muted">Qualification </span>{member.qualification}</p>}
        {member.linkedin && (
          <a href={member.linkedin} className="leader-card__social nudge-host" target="_blank" rel="noopener noreferrer">
            LinkedIn profile <Icon name="link" size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
