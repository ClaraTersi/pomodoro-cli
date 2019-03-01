const { log } = console;
const chalk = require('chalk');
const { table } = require('table');
const moment = require('moment-timezone');
const { listTasks, getSingleTask } = require('../db');

const getTasks = (taskLabel) => {
  let tasks = [];
  if (taskLabel) {
    tasks = getSingleTask(taskLabel);
  } else {
    tasks = listTasks();
  }
  return tasks;
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  const timezone = moment.tz.guess();
  return moment(dateTime).tz(timezone).format('DD/MM/YYYY HH:mm');
};

const generateReport = (tasks) => {
  const report = [];
  report.push([
    chalk.green.bold('TASK'),
    chalk.green.bold('DESCRIPTION'),
    chalk.green.bold('STARTED AT'),
    chalk.green.bold('FINISHED AT'),
  ]);
  tasks.map(task => report.push([
    task.label,
    task.description,
    formatDateTime(task.started_at),
    formatDateTime(task.finished_at),
  ]));
  const config = {
    columns: {
      1: {
        width: 30,
      },
    },
  };
  return table(report, config);
};

module.exports = (taskTitle) => {
  const tasks = getTasks(taskTitle);
  log(generateReport(tasks));
  log(`${chalk.green.bold('Time spent in minutes:')} ${tasks.length * 25}\n`);
};
