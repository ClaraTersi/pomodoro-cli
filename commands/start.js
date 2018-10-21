const inquirer = require('inquirer');
const chalk = require('chalk');
const { addTask } = require('../db');

const questions = [
  { type: 'input', name: 'tag', message: 'Use a tag to identify the task you are working on:\n' },
  { type: 'input', name: 'description', message: 'Give a brief description of the task:\n' },
];

module.exports = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.log(chalk.blue('Pomodoro timer started!'));
      addTask(answers.tag, answers.description);
      setTimeout(() => { console.log('Pomodoro finish (notification)'); }, 10000, 'Pomodoro finished!');
    })
    .catch((err) => {
      console.log(`Unable to start pomodoro timer. Error: ${err}`);
    });
};
