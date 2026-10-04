import { Link } from 'react-router-dom';
import Icon from '../Common/Icon';
import './ServiceCard.css';

/** Home "What we do" column: number, line icon, title, description, arrow. */
export function ServiceCard({ service }) {
  return (
    <Link to={`/services#${service.id}`} className="service-card nudge-host">
      <span className="service-card__accent" aria-hidden="true" />
      <span className="service-card__head">
        <span className="t-label green">{service.number}</span>
        <Icon name={service.icon} className="green" />
      </span>
      <span className="service-card__body">
        <span className="t-h3 service-card__title">{service.title}</span>
        <span className="t-body-s placeholder">{service.short}</span>
      </span>
      <Icon name="arrowUpRight" className="nudge-arrow nudge-arrow--up service-card__arrow" />
    </Link>
  );
}

/** Services catalogue row: number, icon, title, description, arrow. */
export function ServiceItem({ service, onSelect }) {
  return (
    <a href={`#${service.id}`} className="service-item nudge-host" onClick={onSelect}>
      <span className="t-label green service-item__num">{service.number}</span>
      <Icon name={service.icon} className="green service-item__icon" />
      <span className="t-h2 service-item__title">{service.title}</span>
      <span className="t-body-m placeholder service-item__desc">{service.short}</span>
      <Icon name="arrowRight" className="nudge-arrow service-item__arrow" />
    </a>
  );
}
