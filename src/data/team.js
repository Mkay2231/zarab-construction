// Staff names, roles and qualifications from the supplied company profile.
// Experience values are historical figures recorded in an undated profile.
export const teamCategories = ['All', 'Engineering', 'Project Delivery', 'Management', 'Operations'];

const member = (id, name, role, department, qualification, experienceInProfile) => ({
  id, name, role, department, qualification, experienceInProfile,
  bio: qualification ? role + '. Qualifications listed in the company profile: ' + qualification + '.' : 'Managing Director, named in the company’s quality, health, environmental and community responsibility policies.',
  photo: null, profileUrl: null, linkedin: null,
});

export const team = [
  member('t1', 'Julius Erometse', 'Project Director', 'Project Delivery', 'HND and PGD in Civil Engineering; COREN', 25),
  member('t2', 'Yahaya Kammal', 'Project Consultant', 'Engineering', 'BSc Civil Engineering', 22),
  member('t3', 'Ojelabi Adeyemi', 'Site Engineer', 'Engineering', 'HND Civil Engineering', 4),
  member('t4', 'Isaac Adeyemo', 'Chief Surveyor', 'Engineering', 'HND Survey', 20),
  member('t5', 'Ashiru Abdulrafiu', 'Site Surveyor', 'Engineering', 'BTech Survey', 6),
  member('t6', 'Ola Ajiboye', 'Architect', 'Engineering', 'HND Architecture', 17),
  member('t7', 'Akanni Sunday', 'Site Supervisor', 'Project Delivery', 'Trade Test', 14),
  member('t8', 'Wale Aluko', 'Site Supervisor', 'Project Delivery', 'Trade Test', 15),
  member('t9', 'Tokunbo Moses', 'Site Laboratory Supervisor', 'Operations', 'Trade Test', 25),
  member('t10', 'Moses Ojelabi', 'Site Laboratory Supervisor', 'Operations', 'Trade Test', 22),
  member('t11', 'Kammal Badmus', 'Carpentry Foreman', 'Operations', 'Trade Test', 12),
  member('t12', 'Taofeek Salaudeen', 'Laboratory Foreman', 'Operations', 'Trade Test', 8),
  member('a1', 'Dayo Olubo', 'Personnel & Internal Control Manager', 'Management', 'BSc Business Administration & Management; Diploma in Computing; MBA', 15),
  member('a2', 'Gbenga Ogunleye', 'Administrative Manager', 'Management', 'HND Business Administration & Management', 13),
  member('a3', 'Kehinde Onifade', 'Site Administrator', 'Operations', 'HND Business Administration & Management', 2),
  member('a4', 'Ogunleye Emmanuel', 'Site Accountant', 'Operations', 'HND Accountancy', 2),
];

export const leadership = [
  member('md', 'Gbadamosi S. Olayinka', 'Managing Director', 'Management', null, null),
  team[0], team[1], team[12],
];
