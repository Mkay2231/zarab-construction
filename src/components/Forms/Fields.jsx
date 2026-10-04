import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../Common/Icon';
import { ease } from '../Common/Motion';
import './Forms.css';

/** Error message: icon + text (never colour alone), announced via aria-describedby. */
export function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          className="field__error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease }}
        >
          <Icon name="alert" size={16} />
          <span>{message}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FieldShell({ id, label, required, error, children, className = '' }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span className="field__required">Required</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

const describe = (id, error) => (error ? `${id}-error` : undefined);

export function TextField({ id, label, required, error, type = 'text', ...rest }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={id}
        type={type}
        className="field__input"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe(id, error)}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextArea({ id, label, required, error, ...rest }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className="field--full">
      <textarea
        id={id}
        name={id}
        rows={6}
        className="field__input field__input--textarea"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe(id, error)}
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({ id, label, required, error, options, placeholder, value, ...rest }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <div className="field__select">
        <select
          id={id}
          name={id}
          className={`field__input ${value ? '' : 'is-empty'}`}
          value={value}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describe(id, error)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <Icon name="chevronDown" size={20} className="field__chevron" />
      </div>
    </FieldShell>
  );
}

export function RadioGroup({ name, legend, options, value, onChange }) {
  return (
    <fieldset className="field field--full radio-group">
      <legend className="field__label">{legend}</legend>
      <div className="radio-group__options">
        {options.map((opt) => (
          <label key={opt} className="radio">
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            <span className="radio__control" aria-hidden="true" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Checkbox({ id, label, checked, onChange, error }) {
  return (
    <div className={`field field--full ${error ? 'has-error' : ''}`}>
      <label className="checkbox" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describe(id, error)}
        />
        <span className="checkbox__box" aria-hidden="true"><Icon name="check" size={16} /></span>
        <span>{label}</span>
      </label>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
