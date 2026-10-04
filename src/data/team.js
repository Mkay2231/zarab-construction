// Team data. Structural slots only — these are NOT real people.
// Replace with approved names, titles, departments, bios and portraits.
export const teamCategories = ['All', 'Engineering', 'Project Delivery', 'Management', 'Operations'];

const member = (id) => ({
  id,
  name: '[FULL NAME]',
  role: '[JOB TITLE]',
  department: null, // e.g. 'Engineering' once approved; shown as [DEPARTMENT] meanwhile
  bio: '[Short approved biography]',
  photo: null,
  qualification: null, // only add qualifications Zarab supplies
  profileUrl: null,
  linkedin: null,
});

export const leadership = [member('l1'), member('l2'), member('l3'), member('l4')];
export const team = [1, 2, 3, 4, 5, 6].map((n) => member(`t${n}`));
