// Service scope adapted from the supplied company profile (scope-of-services page).
export const services = [
  {
    id: 'road-construction', number: '01', title: 'Road Construction', icon: 'road',
    short: 'Design and construction of roads, interchanges and tollgate areas, with planned highway maintenance.',
    description: 'Zarab’s road construction scope covers the design and construction of roads, interchanges and tollgate areas, together with planned highway maintenance.',
    supporting: 'Road works form part of our wider civil engineering and city infrastructure services, which also include flood and erosion control.',
    capabilities: ['Road design and construction', 'Interchanges', 'Tollgate areas', 'Planned highway maintenance'],
    imageLabel: '[ROAD CONSTRUCTION IMAGE]',
  },
  {
    id: 'bridge-construction', number: '02', title: 'Bridge Construction', icon: 'bridge',
    short: 'Bridge design and construction as part of road networks and city infrastructure.',
    description: 'Zarab provides bridge design and construction within its civil engineering and infrastructure scope.',
    scope: 'We design and construct roads, bridges and city infrastructure, with services in flood control, underwater works and erosion control.',
    capabilities: ['Bridge design', 'Bridge construction', 'Related civil infrastructure'],
    imageLabel: '[BRIDGE CONSTRUCTION IMAGE]',
  },
  {
    id: 'civil-engineering', number: '03', title: 'Civil Engineering', icon: 'civil',
    short: 'Building construction, flood and erosion control, architectural drawings and related civil works.',
    description: 'Our civil engineering and building scope includes office blocks, residential apartments, schools, hotels, hospitals, industrial facilities and public and leisure facilities. Architectural services include working drawings and landscaping.',
    areas: ['Civil engineering and building construction', 'Flood control and underwater services', 'Erosion control', 'Architectural working drawings and landscaping'],
    imageLabel: '[CIVIL ENGINEERING IMAGE]',
  },
  {
    id: 'infrastructure-development', number: '04', title: 'Infrastructure Development', icon: 'infrastructure',
    short: 'Dams, water supply and treatment systems, power infrastructure and mechanical engineering services.',
    description: 'Our infrastructure scope covers dams, borehole abstraction, aqueducts, water treatment works, storage and service reservoirs, distribution networks, pumping and transmission, regional water-resource surveys, water-supply planning, leakage studies, operations and maintenance.',
    blocks: [
      { title: 'Water Infrastructure', text: 'Design and construction of dams and water-retaining structures, with water resources, treatment, storage, pumping and distribution services.' },
      { title: 'Electrical Engineering', text: 'Design and construction of power transmission lines, substations, hydroelectric power stations, pump stations and rural electrification infrastructure.' },
      { title: 'Mechanical Engineering', text: 'Steel tank fabrication, maintenance works, and onshore and offshore services. Our engineering scope also includes oil pipelines.' },
    ],
    imageLabel: '[INFRASTRUCTURE PROJECT IMAGE]',
  },
];

// Summaries of documented quality practices, not an invented delivery methodology.
export const processSteps = [
  { number: '01', title: 'Client Requirements', text: 'Understand each client’s quality assurance requirements and the requirements of the contract.' },
  { number: '02', title: 'Resources & Procedures', text: 'Provide the resources and documented procedures needed to establish and maintain the quality system.' },
  { number: '03', title: 'Quality in Execution', text: 'Apply systematic working practices, with attention to quality, timely completion, cost, health and environmental protection.' },
  { number: '04', title: 'Review & Improvement', text: 'Review performance, audit corrective actions and seek improvements to reduce deficiencies, scrap and rework.' },
];
