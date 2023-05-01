INSERT INTO department (id, name) VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Engineering');

INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'Sales Manager', 80000.00, 1),
  (2, 'Sales Representative', 50000.00, 1),
  (3, 'Marketing Manager', 75000.00, 2),
  (4, 'Marketing Coordinator', 45000.00, 2),
  (5, 'Software Engineer', 100000.00, 3),
  (6, 'Quality Assurance Engineer', 85000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Bob', 'Johnson', 3, NULL),
  (4, 'Mary', 'Davis', 4, 3),
  (5, 'Michael', 'Lee', 5, NULL),
  (6, 'Julia', 'Chen', 6, 5);
