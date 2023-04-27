const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'bear_evil_db'
});

inquirer.createPromptModule([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    },
]).then(async (answers) => {
    switch (answers.action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
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
            await updateEmployeeRole();
            break;
        default:
            process.exit();
    }
});

async function viewDepartments() {
    // view departments callback function here
}

async function viewRoles() {
    // view roles callback here
}

async function viewEmployees() {
    // view employees callback here
}

async function addDepartment() {
    // adding department callback here
}

async function addRole() {
    // adding role here
}

async function addEmployee() {
    // add employee
}

async function updateEmployeeRole() {
    // update employee role
}
