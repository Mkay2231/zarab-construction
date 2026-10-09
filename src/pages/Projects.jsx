import { useEffect, useRef, useState } from 'react';
import Seo from '../components/Common/Seo';
import PageHero from '../components/Common/PageHero';
import SectionHead from '../components/Common/SectionHead';
import Media from '../components/Common/Media';
import CTA from '../components/Common/CTA';
import Button from '../components/Buttons/Button';
import Icon from '../components/Common/Icon';
import { Reveal } from '../components/Common/Motion';
import { workPhotos, sitePhotos } from '../data/photography';
import './pages.css';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (!selected) return undefined;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [selected]);
  const close = () => dialog.current?.close();
  return (
    <>
      <Seo title="Our Work" description="A look at Zarab Construction's site teams, bridge construction, concrete works and equipment." path="/projects" />
      <PageHero id="projects-hero" crumb="Our Work" eyebrow="On site with Zarab"
        title="Our work. In focus."
        body="From reinforcement and formwork to concrete casting and bridge installation, see our people and equipment at work."
        ratio="4 / 5" media={sitePhotos.hero}
        actions={<><Button href="#work-gallery" variant="primary" icon="arrow">Explore the Gallery</Button><Button to="/contact" variant="secondary">Contact Zarab</Button></>} />
      <section id="work-gallery" className="section section--white" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead id="gallery-title" label="Our work in pictures" title="Built by people. Captured on site." aside="Construction photography showing the details, equipment and teamwork behind the work." />
          <div className="work-gallery">
            {workPhotos.map((photo) => (
              <Reveal key={photo.id} as="figure" className="work-gallery__item">
                <button type="button" className="work-gallery__open zoom-host" onClick={() => setSelected(photo)} aria-label={'View photo: ' + photo.caption}>
                  <div className="zoom-media"><Media src={photo.src} alt={photo.alt} ratio="4 / 5" /></div>
                  <span className="work-gallery__expand" aria-hidden="true"><Icon name="arrowUpRight" size={20} /></span>
                </button>
                <figcaption className="t-body-s">{photo.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <dialog ref={dialog} className="photo-viewer" aria-label="Construction photograph" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        {selected && <div className="photo-viewer__content">
          <button type="button" className="photo-viewer__close" onClick={close} autoFocus aria-label="Close photograph">Close ×</button>
          <img src={selected.src} alt={selected.alt} />
          <p className="t-body-s">{selected.caption}</p>
        </div>}
      </dialog>
      <CTA heading="Have an infrastructure project in mind?" body="Let's discuss how Zarab can support your next project." primary={{ label: 'Start a Conversation', to: '/contact' }} secondary={{ label: 'Explore Our Services', to: '/services' }} />
    </>
  );
}
