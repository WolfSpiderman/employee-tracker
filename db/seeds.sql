USE bear_evil_db;

-- Insert departments
INSERT INTO department (id, name) VALUES
  (1, 'The Bad Magic Council'),
  (2, 'Mind Control and Propaganda'),
  (3, 'Plague & Pestilence Management'),
  (4, 'WHIPPLE Energy'),
  (5, 'Chase, Kemper, & Krull Law'),
  (6, 'Child Labor and Exploitation'),
  (7, 'Environmental Destruction'),
  (8, 'Pharmaceuticals'),
  (9, 'Public Relations');


-- Insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'The Dark Overlord (CEO)', 10000000.00, 1),
  (2, 'Queen of Bad Magic (CFO)', 900000.00, 1),
  (3, 'Apocalypse Technician (CTO)', 700000.00, 1),
  (4, 'Tyrant of Branding (CMO)', 700000.00, 1),
  (5, 'Neophyte (Servant to Council)', 90000.00, 1);


-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'King Dan', 'Cummins the Magnificent', 1, NULL),
  (2, 'Lynze', 'Cummins the Magnificent', 2, NULL),
  (3, 'Tyler', 'Sea', 3, 1),
  (4, 'Logan', 'Keith', 4, 1);