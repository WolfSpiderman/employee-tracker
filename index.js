const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const util = require('util');
require('dotenv').config();

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'bear_evil_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Execute a query using a connection from the pool
const query = async (sql, values) => {
  const promisePool = pool.promise();
  const [results] = await promisePool.query(sql, values);
  return results;
};

const start = async () => {
  try {
    const { command } = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ]);

    switch (command) {
      case 'View all departments':
        console.table(await query('SELECT * FROM department'));
        break;
      case 'View all roles':
        console.table(await query('SELECT * FROM role'));
        break;
      case 'View all employees':
        console.table(await query('SELECT * FROM employee'));
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        console.log('Update employee role function');
        break;
      default:
        pool.end();
        process.exit();
    }
    await start();
  } catch (error) {
    console.error(error);
    await start();
  }
};

const getMaxId = async (tableName) => {
  try {
    const result = await query(`SELECT MAX(id) AS maxId FROM ${tableName}`);
    return result[0].maxId || 0;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

const addDepartment = async () => {
  try {
    console.clear();

    const maxDept = await getMaxId('department');

    const { departmentId, departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentId',
        message: `What is the ID of the new department? Currently, the highest Department ID is ${maxDept}.`,
        validate: (input) =>
          !input ? 'Please enter a department ID.' : /^[0-9]+$/.test(input) ? true : 'Department ID must be a number.',
      },
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the new department?',
        validate: (input) =>
          !input
            ? 'Please enter a department name.'
            : input.length > 30
            ? 'Department name must be less than 30 characters.'
            : true,
      },
    ]);


    const existingDepartment = await query('SELECT * FROM department WHERE id = ?', [departmentId]);

    if (existingDepartment.length > 0) {
      console.log(`Error: Department with ID ${departmentId} already exists!\n`);
      await start();
      return;
    }

    const result = await query('INSERT INTO department SET ?', {
      id: departmentId,
      name: departmentName,
    });

    console.log(`${result.affectedRows} department added!\n`);
    await start();
  } catch (error) {
    console.error(error);
    await start();
  }
};

const addRole = async () => {
  try {
    console.clear();

    const departments = await query('SELECT id, name FROM department');
    if (!departments.length) {
      console.log('No departments currently exist.. Please create one first, or source one of the seeds files.\n');
      await start();
      return;
    }

    const maxRole = await getMaxId('role');

    const { roleId, roleName, roleSalary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleId',
        message: `What is the ID of the new role? Currently, the highest Role ID is ${maxRole}.`,
        validate: (input) =>
          !input ? 'Please enter a role ID.' : /^[0-9]+$/.test(input) ? true : 'Role ID must be a number.',
      },
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the new role?',
        validate: (input) =>
          !input
            ? 'Please enter a role name.'
            : input.length > 30
            ? 'Role name must be less than 30 characters.'
            : true,
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the base annual salary of the new role?',
        validate: (input) =>
        !input ? 'Please enter a salary.' : /^[0-9]+$/.test(input) ? true : 'Role Salary must be a number',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department does the new role belong to?',
        choices: departments.map((dept) => ({ name: dept.name, value: dept.id})),
      },
    ]);

    const existingRole = await query('SELECT * FROM role WHERE id = ?', [roleId]);

    if (existingRole.length > 0) {
      console.log(`Error: Role with ID ${roleId} already exists!\n`);
      await start();
      return;
    }

    const result = await query('INSERT INTO role SET ?', {
      id: roleId,
      title: roleName,
      salary: roleSalary,
      department_id: departmentId,
    });

    console.log(`${result.affectedRows} role added!\n`);
    await start();
  } catch (error) {
    console.error(error);
    await start();
  }
}

const addEmployee = async () => {
  try {
    console.clear();

    const departments = await query('SELECT id, name FROM department');
    if (!departments.length) {
      console.log('No departments currently exist.. Please create one first, or source one of the seeds files.');
      await start();
      return;
    }
    
    const maxEmp = await getMaxId('employee');

    async function validateEmployeeId(employeeId) {
    
      const employees = await query('SELECT id FROM employee');
      const existingEmployeeIds = employees.map((emp) => emp.id);
    
      if (existingEmployeeIds.includes(Number(employeeId))) { // Check if employee ID exists
        console.log('employee id exists')
        return true;
      } else {
        console.log('employee doesnt exist')
        return 'Employee ID does not exist. Please enter a valid employee ID.';
      }
    }
    

    const { empId, firstName, lastName, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'empId',
        message: `What is the ID of the new employee? Currently, the highest Employee ID is ${maxEmp}.`,
        validate: (input) =>
        !input ? 'Please enter an employee ID.' : /^[0-9]+$/.test(input) ? true : 'Employee ID must be a number.',
      },
      {
        type: 'input',
        name: 'firstName',
        message: `What is the new employee's first name?`,
        validate: (input) =>
          !input
            ? 'Please enter a first name.'
            : input.length > 30
            ? 'First name must be less than 30 characters for database entry.'
            : true,
      },
      {
        type: 'input',
        name: 'lastName',
        message: `What is the new employee's last name?`,
        validate: (input) =>
          !input
            ? 'Please enter a last name.'
            : input.length > 30
            ? 'Last name must be less than 30 characters for database entry.'
            : true,
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department will the new employee be working in?',
        choices: departments.map((dept) => ({ name: dept.name, value: dept.id})),
      },
    ]);

    const roles = async (dept) => {
      try {
        const result = await query('SELECT id, title FROM role WHERE department_id = ?', dept);
    
        if (!result.length) {
          console.log('No roles currently exist.. Please create one first, or source one of the seeds files.');
          return [];
        }
    
        return result;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const deptRoles = await roles(departmentId);

    const { roleId, mng, managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: "What role will the new employee be occupying?",
        choices: deptRoles.map((role) => ({ name: role.title, value: role.id })),
      },
      {
        type: 'confirm',
        name: 'mng',
        message: 'Does the new employee report to a manager, supervisor, or department head?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: `If the new employee has an assigned supervisor/manager, put the supervisor/manager's Employee ID here. If not, leave field empty.`,
        validate: validateEmployeeId,
        when: answer => answer.mng,
      }
    ]);

    const existingEmp = await query('SELECT * FROM employee WHERE id = ?', [empId]);

    if (existingEmp.length > 0) {
      console.log(`Error: Employee with ID ${empId} already exists!\n`);
      await start();
      return;
    }

    const result = await query('INSERT INTO employee SET ?', {
      id: empId,
      first_name: firstName,
      last_name: lastName,
      role_id: roleId,
      manager_id: managerId || null,
    });

    console.log(`${result.affectedRows} role added!\n`);
    await start();
  } catch (error) {
    console.error(error);
    await start();
  }
}

start();