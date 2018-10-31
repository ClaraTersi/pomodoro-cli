const { log } = console;
const inquirer = require('inquirer');
const chalk = require('chalk');
const ProgressBar = require('progress');
const { addTask } = require('../db');
const { notify } = require('../notifications');

const questions = [
  { type: 'input', name: 'title', message: 'Identify the task you are working on:\n' },
  { type: 'input', name: 'description', message: 'Give a brief description of the task:\n' },
];

const progressText = `[${chalk.green(':bar')}] ${chalk.green(':current')}/25 minutes working on task ${chalk.blue.bold(':task')}.`;

module.exports = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      log(chalk.blue('Pomodoro timer started!'));
      addTask(answers.title, answers.description);
      const bar = new ProgressBar(progressText, { total: 25, incomplete: ' ' });
      const timer = setInterval(() => {
        bar.tick({ task: answers.title });
        if (bar.complete) {
          notify();
          log(chalk.blue('Pomodoro finished!'));
          clearInterval(timer);
        }
      }, 60000);
    })
    .catch((err) => {
      log(`Unable to start pomodoro timer. Error: ${err}`);
    });
};