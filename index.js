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
]).then((answers) => {
    if (answers.action === 'View all departments') {
        // view departments callback function here
    } else if (answers.action === 'View all roles') {
        // view roles callback here
    } else if (answers.action === 'View all employees') {
        // view employees callback here
    } else if (answers.action === 'Add a department') {
        // adding department callback here
    } else if (answers.action === 'Add a role') {
        // adding role here
    } else if (answers.action === 'Add an employee') {
        // add employee
    } else if (answers.action === 'Update an employee role') {
        // update employee role
    } else {
        process.exit();
    }
});