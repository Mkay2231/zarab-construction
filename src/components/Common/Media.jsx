import Icon from './Icon';
import './common.css';

/**
 * Image slot. Renders the approved photo when `src` is provided, otherwise a
 * neutral placeholder that states which asset is required. Never pass stock
 * imagery presented as Zarab work.
 */
export default function Media({
  src,
  alt = '',
  ratio = '4 / 3',
  label = '[PROJECT IMAGE]',
  note = 'Awaiting approved Zarab photography',
  className = '',
  sizes,
  srcSet,
  priority = false,
  fill = false,
}) {
  const style = fill ? undefined : { aspectRatio: ratio };
  return (
    <div className={`media ${fill ? 'media--fill' : ''} ${className}`} style={style}>
      {src ? (
        <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <div className="media__placeholder" role="img" aria-label={`${label.replace(/[[\]]/g, '')} — placeholder, ${note}`}>
          <span className="media__inner">
            <Icon name="image" size={20} />
            <span className="t-label">{label}</span>
            <span className="t-caption">{note}</span>
          </span>
        </div>
      )}
    </div>
  );
}
