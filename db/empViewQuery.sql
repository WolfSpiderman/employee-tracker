SELECT
  employee.id AS id,  
  employee.first_name AS first_name,
  employee.last_name AS last_name,
  role.title AS role,
  department.name AS department
FROM employee
JOIN role
  ON employee.role_id = role.id
JOIN department
  ON department.id = role.department_id;