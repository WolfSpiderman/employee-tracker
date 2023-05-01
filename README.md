# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Description

This week's challenge was to build a content management system from scratch, in the form of an employee tracker and mysql database for a mock company. It was a new challenge, indeed, as we had previously on worked with interactivity with mysql databases with express, but for the challenge, we were creating a command-line application. This content management system has three tables of data that can be viewed or added to, as well as altered in various ways. While working on this project, I learned a lot about working with mysql in general, as well as working with databases and tables. I also learned how frustrated trying to get the ai to debug for you can be, but that's a whole other story. I did have some fun with the seed data working on this project, making it for a mock fictional company that exists in my favorite podcast, but that seed data still needs a lot of work. I also included a finished, standard seed data file.
  
## Table of Contents
  
[Installation](#Installation)
  
[Usage](#Usage)

[License](#License)
    
[Credits](#Credits)

## Installation

You will need mysql and NodeJs to run this application in your command line. After you have those, you will want to fork the repo, pull it to your local repository, and then create a .env file to put your own password in under the name "PASSWORD". Finally, run npm install.

## Usage

<img src="./images/emp-tracker.png" alt="screenshot of employee tracker command line app" style="display: block; margin: 0; max-width: 300px;">

After doing the above steps, open the mysql shell and run source schema.sql, followed by source seeds.sql(or boringSeeds.sql) to create the database and insert some seed data. Then, run node index.js to start the application. You will see a menu with the options to view all departments, roles, or employees, add a new department, role, or employee, to update an employee role, or to exit. Selecting one of the view options will display an organized list of all the current existing departments, roles, or employees from the database. Selecting one of the options to add a new entry will trigger a series of prompts to gather the necessary data for the new department, role, or employee. Selecting the update employee option will have the user select the employee they are updating from a list, followed by two more list prompts to select the department and then new role.

A video of the app being demonstrated can be found [here](https://drive.google.com/file/d/1qac8KQXamclzLY_TIbFVyQGCTPZZ1PT3/view).

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT)

## Credits

## Questions

[![GitHub](https://img.shields.io/badge/GitHub-WolfSpiderman-orange)](https://github.com/WolfSpiderman)

Contact me with any questions:
[Email](#)
