const { log } = console;
const chalk = require('chalk');
const { table } = require('table');
const { listTasks, getSingleTask } = require('../db');

const getTasks = (taskTitle) => {
  let tasks = [];
  if (taskTitle) {
    tasks = getSingleTask(taskTitle);
  } else {
    tasks = listTasks();
  }
  return tasks;
};

const generateReport = (tasks) => {
  const report = [];
  report.push([chalk.green.bold('TASK'), chalk.green.bold('DESCRIPTION'), chalk.green.bold('STARTED AT')]);
  tasks.map(task => report.push([task.id, task.description, task.started_at]));
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
};
