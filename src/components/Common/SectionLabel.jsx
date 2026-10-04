import './common.css';

/** Uppercase eyebrow. The yellow rule is reserved for page-hero eyebrows. */
export default function SectionLabel({ children, rule = false, theme = 'light', as: Tag = 'p', className = '', ...rest }) {
  return (
    <Tag className={`section-label section-label--${theme} ${className}`} {...rest}>
      {rule && <span className="section-label__rule" aria-hidden="true" />}
      <span className="t-label">{children}</span>
    </Tag>
  );
}
