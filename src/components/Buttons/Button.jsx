import { Link } from 'react-router-dom';
import Icon from '../Common/Icon';
import './Button.css';

/**
 * Button / link with Zarab variants.
 * variant: 'primary' | 'secondary' | 'text'   theme: 'light' | 'dark'
 * Renders <Link> for internal routes (`to`), <a> for `href`, otherwise <button>.
 */
export default function Button({
  variant = 'primary',
  theme = 'light',
  to,
  href,
  icon,
  full = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${theme} nudge-host ${full ? 'btn--full' : ''} ${className}`;
  const iconEl = icon ? (
    <Icon name={icon === 'arrow' ? 'arrowRight' : icon} size={20} className={icon === 'arrow' ? 'nudge-arrow' : ''} />
  ) : null;
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {iconEl}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
