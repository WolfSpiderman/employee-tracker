USE bear_evil_db;

-- Insert departments
INSERT INTO department (id, name) VALUES
  (1, 'The Bad Magic Council'),
  (2, 'Mind Control and Propaganda'),
  (3, 'Plague and Pestilence Management'),
  (4, 'WHIPPLE Energy'),
  (5, 'Chase, Kemper, & Krull Law Offices'),
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
  (5, 'Neophyte (Servant to Council)', 90000.00, 1),


-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Bob', 'Johnson', 3, 1);