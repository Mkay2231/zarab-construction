// Project data. Every project is a structural placeholder — do not add names,
// clients, locations, dates, values or outcomes until Zarab supplies them.
// `image`: path under /public/images/projects once approved photography exists.
export const projectCategories = ['All', 'Roads', 'Bridges', 'Civil Works', 'Infrastructure'];

export const categoryLabel = {
  Roads: 'Road Construction',
  Bridges: 'Bridge Construction',
  'Civil Works': 'Civil Works',
  Infrastructure: 'Infrastructure',
};

const placeholder = (id, category) => ({
  id,
  name: '[PROJECT NAME]',
  location: '[LOCATION]',
  category, // one of projectCategories (excluding "All"), or null when not yet known
  description: '[Approved description]',
  image: null,
  year: '[YEAR]',
  status: '[Completed / Ongoing]',
  client: '[Client Name]',
  scope: '[Approved scope of work]',
  overview: '[Approved project overview]',
  outcome: '[Approved outcome / impact statement]',
});

export const projects = [
  placeholder(1, 'Roads'),
  placeholder(2, 'Bridges'),
  placeholder(3, 'Civil Works'),
  placeholder(4, 'Infrastructure'),
  placeholder(5, null),
  placeholder(6, null),
];

export const featuredProject = {
  ...placeholder(0, null),
  name: '[Project Name]',
  location: '[Project Location]',
  type: '[Road / Bridge / Civil Works / Infrastructure]',
  description: '[Approved project description]',
};
