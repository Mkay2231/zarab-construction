const photo = (id, file, caption) => ({ id, src: `/images/projects/${file}.jpg`, alt: caption, caption });
// Shared site photography; images are not attributed to individual projects.
export const workPhotos = [
  photo('structure', 'bridge-structure', 'Concrete bridge structure and supporting piers'),
  photo('crane', 'bridge-crane', 'Crane lifting a concrete girder into position'),
  photo('team', 'bridge-deck-team', 'Site team working on a concrete bridge deck'),
  photo('concrete', 'baro-concrete', 'Concrete placement with timber formwork and reinforcement'),
  photo('reinforcement', 'ekiti-reinforcement', 'Preparing reinforcement cages for concrete works'),
  photo('girder', 'baro-girder', 'Lifting a concrete bridge girder'),
  photo('casting', 'ekiti-concrete', 'Concrete casting and formwork at a construction site'),
  photo('foundation', 'baro-reinforcement', 'Reinforcement and formwork within an excavation'),
  photo('pour', 'site-work-0027', 'Site workers guiding concrete placement'),
  photo('forms', 'site-work-0030', 'Timber supports along concrete formwork'),
  photo('panels', 'site-work-0032', 'Casting reinforced concrete panels on site'),
  photo('deck-work', 'site-work-0035', 'Site team preparing bridge deck elements'),
  photo('installation', 'site-work-0036', 'Crane-assisted bridge girder installation'),
  photo('beams', 'site-work-0037', 'Concrete bridge beams before deck installation'),
  photo('piers', 'site-work-0038', 'Bridge beams resting on concrete piers'),
  photo('equipment', 'site-work-0039', 'Construction equipment and stacked concrete panels'),
  photo('deck-lift', 'site-work-0041', 'Lifting a concrete panel onto the bridge deck'),
];
export const sitePhotos = {
  hero: workPhotos[1], bridge: workPhotos[0], team: workPhotos[2],
  concrete: workPhotos[3], reinforcement: workPhotos[4], road: workPhotos[6], civil: workPhotos[7],
};
