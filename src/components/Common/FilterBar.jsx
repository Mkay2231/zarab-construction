import { useId } from 'react';
import { motion } from 'framer-motion';
import { ease } from './Motion';
import './FilterBar.css';

/** Category filter chips (shared by Projects and Team). Scrolls horizontally on small screens. */
export default function FilterBar({ options, value, onChange, label, counts }) {
  const layoutId = useId();
  return (
    <div className="filter-bar" role="group" aria-label={label}>
      <div className="filter-bar__track">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              className={`filter-chip ${active ? 'is-active' : ''}`}
              aria-pressed={active}
              onClick={() => onChange(opt)}
            >
              {active && <motion.span layoutId={layoutId} className="filter-chip__bg" transition={{ duration: 0.3, ease }} />}
              <span className="filter-chip__label">
                {opt}
                {counts && <span className="visually-hidden"> ({counts[opt] ?? 0})</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
