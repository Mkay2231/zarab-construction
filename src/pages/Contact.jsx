import Seo from '../components/Common/Seo';
import PageHero from '../components/Common/PageHero';
import SectionHead from '../components/Common/SectionHead';
import SectionLabel from '../components/Common/SectionLabel';
import CTA from '../components/Common/CTA';
import Icon from '../components/Common/Icon';
import Button from '../components/Buttons/Button';
import ContactForm from '../components/Forms/ContactForm';
import { Reveal, Stagger, RevealItem } from '../components/Common/Motion';
import { scrollToSection } from '../hooks/useSections';
import { company, isPlaceholder } from '../data/company';
import './pages.css';

// Real tel:/mailto:/directions links are only created once approved details exist.
const tel = isPlaceholder(company.phone) ? null : `tel:${company.phone.replace(/\s+/g, '')}`;
const mailto = isPlaceholder(company.email) ? null : `mailto:${company.email}`;
const directions = company.directionsUrl;

function Action({ href, children }) {
  if (!href) {
    return <span className="method__action" aria-disabled="true" title="Available once approved contact details are added">{children}</span>;
  }
  return <a href={href} className="method__action nudge-host">{children}<Icon name="arrowRight" size={20} className="nudge-arrow" /></a>;
}

function InfoItem({ icon, label, value, secondary, action, href }) {
  return (
    <RevealItem className="info-item">
      <Icon name={icon} className="info-item__icon" />
      <div className="stack" style={{ '--stack': 'var(--space-4)' }}>
        <p className="t-label muted">{label}</p>
        <p className="info-item__value">{value}</p>
        {secondary && <p className="t-body-s muted">{secondary}</p>}
      </div>
      {action && <Action href={href}>{action}</Action>}
    </RevealItem>
  );
}

function Method({ icon, label, value, href, action }) {
  return (
    <li className="method">
      <Icon name={icon} className="method__icon" />
      <span className="method__text">
        <span className="t-label muted">{label}</span>
        <span className="t-body-m">{value}</span>
      </span>
      {action && <Action href={href}>{action}</Action>}
    </li>
  );
}

const goToForm = () => scrollToSection('contact-form');

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Have an infrastructure project, partnership opportunity or enquiry? Get in touch with Zarab Construction Company Ltd."
        path="/contact"
      />

      {/* 06.1 Contact Hero */}
      <PageHero
        id="contact-hero"
        crumb="Contact"
        eyebrow="Get in touch"
        title={<>Let&apos;s build what&nbsp;matters<span className="accent-yellow">.</span></>}
        body="Have an infrastructure project, partnership opportunity or enquiry? Get in touch with Zarab Construction Company Ltd."
        actions={
          <>
            <Button variant="primary" icon="arrow" onClick={goToForm}>Send an Enquiry</Button>
            <Button variant="secondary" icon="phone" href={tel ?? '#contact-information'}>Call Zarab</Button>
          </>
        }
        extra={<p className="t-body-s muted" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="phone" size={16} />{company.phone}</p>}
        media={{ label: '[CONTACT / ENGINEERING IMAGE]', note: 'Awaiting approved Zarab photography' }}
      />

      {/* 06.2 Contact Information */}
      <section id="contact-information" className="section section--white" aria-labelledby="info-title">
        <div className="container">
          <SectionHead id="info-title" label="Contact information" title="We're ready to hear from you." note="Email addresses are supplied in the company profile. Phone, office location and opening hours are still to be confirmed." />
          <Stagger className="contact-info">
            <InfoItem icon="phone" label="Phone" value={company.phone} secondary={company.phoneSecondary} action="Call Us" href={tel} />
            <InfoItem icon="mail" label="Email" value={company.email} action="Send Email" href={mailto} />
            <InfoItem icon="mail" label="Alternative Email" value={company.emailSecondary} action="Send Email" href={`mailto:${company.emailSecondary}`} />
            <InfoItem icon="location" label="Office" value={company.address} secondary={company.region} action="Get Directions" href={directions} />
            <InfoItem icon="clock" label="Business Hours" value={company.hours} secondary={company.weekendHours} />
          </Stagger>
          <Reveal className="online">
            <p className="t-label muted">Online</p>
            {company.social.map((s) => (
              s.href ? (
                <a key={s.label} href={s.href} className="online__link" target="_blank" rel="noopener noreferrer">{s.label}<Icon name="link" size={16} /></a>
              ) : (
                <span key={s.label} className="online__link">{s.label}<Icon name="link" size={16} /></span>
              )
            ))}
            <p className="t-caption muted online__note">Show only approved profiles.</p>
          </Reveal>
        </div>
      </section>

      {/* 06.3 Contact Form */}
      <section id="contact-form" className="section section--bg" aria-labelledby="form-title">
        <div className="container">
          <SectionHead id="form-title" label="Send an enquiry" title="Tell us about your project." aside="Share a few details and the Zarab team can follow up with you." />
          <div className="form-layout">
            <Reveal><ContactForm /></Reveal>
            <Reveal delay={0.1} as="aside" className="aside-panel" aria-label="Other ways to contact Zarab">
              <p className="t-label green">Prefer to talk?</p>
              <h3 className="t-h3">Speak to the Zarab team directly.</h3>
              <ul className="method-list">
                <Method icon="phone" label="Phone" value={company.phone} href={tel} action="Call" />
                <Method icon="mail" label="Email" value={company.email} href={mailto} action="Email" />
                <Method icon="mail" label="Alternative Email" value={company.emailSecondary} href={`mailto:${company.emailSecondary}`} action="Email" />
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06.4 Location / Map */}
      <section id="location" className="section section--white" aria-labelledby="location-title">
        <div className="container">
          <SectionHead id="location-title" label="Find us" title="Visit our office." />
          <div className="form-layout">
            <Reveal type="image" className="map">
              {company.mapEmbedUrl ? (
                <iframe title={`Map showing the ${company.name} office`} src={company.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="map__label" role="img" aria-label="Map placeholder — map to be connected once the approved office address is supplied">
                  <span className="t-label muted">[MAP / LOCATION]</span>
                  <span className="t-caption muted">Map to be connected once the approved office address is supplied.</span>
                </div>
              )}
            </Reveal>
            <Reveal delay={0.1} className="aside-panel">
              <SectionLabel as="h3">Office</SectionLabel>
              <p className="t-body-l">{company.address}</p>
              <p className="t-body-m muted">{company.region}</p>
              <div>
                {directions
                  ? <Button href={directions} variant="secondary" icon="location" target="_blank" rel="noopener noreferrer">Get Directions</Button>
                  : <Button variant="secondary" icon="location" disabled title="Available once the approved office address is added">Get Directions</Button>}
              </div>
              <ul className="method-list">
                <Method icon="phone" label="Call" value={company.phone} />
                <Method icon="mail" label="Email" value={company.email} />
                <Method icon="location" label="Directions" value={company.address} />
                {company.whatsapp && <Method icon="phone" label="WhatsApp" value={company.whatsapp} href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`} action="Message" />}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06.5 CTA */}
      <CTA
        heading="Have a project in mind?"
        body="Let's start a conversation about your next infrastructure project."
        primary={{ label: 'Send an Enquiry', onClick: goToForm }}
        secondary={{ label: 'Explore Our Services', to: '/services' }}
      />
    </>
  );
}
