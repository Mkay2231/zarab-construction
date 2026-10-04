import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../Buttons/Button';
import Icon from '../Common/Icon';
import { ease } from '../Common/Motion';
import { TextField, TextArea, SelectField, RadioGroup, Checkbox } from './Fields';
import { submitEnquiry } from '../../services/contactService';
import { company } from '../../data/company';
import { scrollToSection } from '../../hooks/useSections';
import './Forms.css';

const projectTypes = ['Road Construction', 'Bridge Construction', 'Civil Engineering', 'Infrastructure Development', 'Other'];
// WhatsApp is offered only once Zarab confirms a number (company.whatsapp).
const contactMethods = ['Phone', 'Email', ...(company.whatsapp ? ['WhatsApp'] : [])];

const empty = {
  fullName: '', email: '', phone: '', company: '', projectType: '', location: '', details: '', method: '', consent: false,
};

const labels = {
  fullName: 'Full Name', email: 'Email Address', phone: 'Phone Number', details: 'Project Details', consent: 'Consent',
};

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = 'This field is required.';
  if (!v.email.trim()) e.email = 'This field is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (v.phone.trim() && !/^[+()\d][\d\s()+-]{6,19}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (!v.details.trim()) e.details = 'Please tell us a little about your project.';
  if (!v.consent) e.consent = 'Please confirm we can contact you about this enquiry.';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);
  const panelRef = useRef(null);
  const honeypotRef = useRef(null); // spam trap: real users never see or fill it

  const set = (key) => (e) => {
    const next = { ...values, [key]: e?.target ? e.target.value : e };
    setValues(next);
    if (touched[key] || showSummary) setErrors(validate(next));
  };
  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };
  const err = (key) => ((touched[key] || showSummary) ? errors[key] : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus('loading');
    try {
      await submitEnquiry({
        ...values,
        submittedAt: new Date().toISOString(),
        'bot-field': honeypotRef.current?.value ?? '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => panelRef.current?.focus());
  };

  const reset = () => { setValues(empty); setErrors({}); setTouched({}); setShowSummary(false); setStatus('idle'); };

  const errorList = Object.entries(errors);

  return (
    <div className="contact-form" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' || status === 'error' ? (
          <motion.div
            key={status}
            ref={panelRef}
            tabIndex={-1}
            className={`form-panel form-panel--${status}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            <Icon name={status === 'success' ? 'check' : 'alert'} size={32} className="form-panel__icon" />
            <h3 className="t-h2">{status === 'success' ? 'Enquiry received.' : "We couldn't send your enquiry."}</h3>
            <p className="t-body-l muted">
              {status === 'success'
                ? `Thank you for contacting ${company.name} We'll get back to you using your preferred contact method.`
                : "Your message hasn't been sent. Please check your details and try again."}
            </p>
            <div className="form-panel__actions">
              {status === 'success' ? (
                <>
                  <Button to="/" variant="primary">Back to Home</Button>
                  <Button variant="secondary" onClick={reset}>Send Another Enquiry</Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={() => setStatus('idle')}>Try Again</Button>
                  <Button variant="secondary" onClick={() => scrollToSection('contact-information')}>Use Another Contact Method</Button>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-busy={status === 'loading'}
          >
            <AnimatePresence>
              {showSummary && errorList.length > 0 && (
                <motion.div
                  ref={summaryRef}
                  tabIndex={-1}
                  className="form-summary"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="form-summary__inner">
                    <Icon name="alert" size={20} />
                    <div>
                      <p className="t-body-s">Some details need your attention. Please check the highlighted fields.</p>
                      <ul className="form-summary__list">
                        {errorList.map(([k]) => (
                          <li key={k}><a href={`#${k === 'consent' ? 'consent' : k}`}>{labels[k] ?? k}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="t-caption muted form-note">Fields marked Required must be completed.</p>

            {/* Honeypot (Netlify Forms + cPanel script discard submissions where this is filled). */}
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="bot-field">Leave this field empty</label>
              <input ref={honeypotRef} id="bot-field" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="form-grid">
              <TextField id="fullName" label="Full Name" required placeholder="Enter your full name" autoComplete="name"
                value={values.fullName} onChange={set('fullName')} onBlur={blur('fullName')} error={err('fullName')} />
              <TextField id="email" label="Email Address" required type="email" placeholder="Enter your email address" autoComplete="email"
                value={values.email} onChange={set('email')} onBlur={blur('email')} error={err('email')} />
              <TextField id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" autoComplete="tel"
                value={values.phone} onChange={set('phone')} onBlur={blur('phone')} error={err('phone')} />
              <TextField id="company" label="Company / Organisation" placeholder="Enter your company or organisation" autoComplete="organization"
                value={values.company} onChange={set('company')} />
              <SelectField id="projectType" label="Project Type" placeholder="Select project type" options={projectTypes}
                value={values.projectType} onChange={set('projectType')} />
              <TextField id="location" label="Project Location" placeholder="Where is the project located?"
                value={values.location} onChange={set('location')} />
              <TextArea id="details" label="Project Details" required placeholder="Tell us briefly about your project or enquiry..."
                value={values.details} onChange={set('details')} onBlur={blur('details')} error={err('details')} />
              <RadioGroup name="method" legend="Preferred Contact Method" options={contactMethods} value={values.method} onChange={set('method')} />
              <Checkbox id="consent" label="I agree to be contacted regarding this enquiry." checked={values.consent}
                onChange={(c) => { setTouched((t) => ({ ...t, consent: true })); set('consent')(c); }} error={err('consent')} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary btn--light nudge-host form-submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><span className="spinner" aria-hidden="true" /><span>Sending…</span></>
                ) : (
                  <><span>Send Enquiry</span><Icon name="arrowRight" size={20} className="nudge-arrow" /></>
                )}
              </button>
              <Button variant="text" onClick={reset} disabled={status === 'loading'}>Clear Form</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
