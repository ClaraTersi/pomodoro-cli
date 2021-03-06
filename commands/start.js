const { log } = console;
const moment = require('moment');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ProgressBar = require('progress');
const { addTask, setTaskFinished, getCurrentTask } = require('../db');
const { notify } = require('../notifications');

const TICK_INTERVAL_IN_MILLISECONDS = 60000;

const questions = [
  { type: 'input', name: 'label', message: 'Identify the task you are working on:\n' },
  { type: 'input', name: 'description', message: 'Give a brief description of the task:\n' },
  { type: 'input', name: 'duration', message: 'How long (minutes) will this pomodoro take?:\n' },
];

const progressText = durationInMinutes => `[${chalk.green.bold(':bar')}] ${chalk.green.bold(':current')}/${durationInMinutes} minutes working on task ${chalk.blue.bold(':task')}.`;

const finishCurrentTask = () => {
  const currentTask = getCurrentTask();
  const finishedAt = new Date();
  const timeElapsedInMinutes = Math.round(moment.duration(finishedAt - currentTask.started_at).asMinutes());
  setTaskFinished(currentTask.id, finishedAt, timeElapsedInMinutes);
};

const startTimer = (answers) => {
  log(chalk.blue.bold('Pomodoro timer started!'), chalk.red('Press Ctrl+C to interrupt this task.'));

  const durationInMinutes = +answers.duration;
  const bar = new ProgressBar(progressText(durationInMinutes), { total: durationInMinutes, incomplete: ' ' });
  bar.tick(0, { task: answers.label });

  const timer = setInterval(() => {
    bar.tick({ task: answers.label });
    if (bar.complete) {
      finishCurrentTask();
      notify();
      log(chalk.blue('Pomodoro finished!'));
      clearInterval(timer);
    }
  }, TICK_INTERVAL_IN_MILLISECONDS);
};

module.exports = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      addTask(answers.label, answers.description);

      process.on('SIGINT', () => {
        finishCurrentTask();
        log(chalk.red(`\nTask ${answers.label} interrupted.`));
        process.exit();
      });

      startTimer(answers);
    })
    .catch((err) => {
      log(`Unable to start pomodoro timer. ${err}`);
    });
};
