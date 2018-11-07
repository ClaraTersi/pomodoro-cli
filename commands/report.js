const { log } = console;
const chalk = require('chalk');
const { table } = require('table');
const { listTasks } = require('../db');

module.exports = () => {
  const tasks = listTasks();
  const data = [];
  data.push([chalk.green.bold('TASK'), chalk.green.bold('DESCRIPTION'), chalk.green.bold('STARTED AT')]);
  tasks.map(task => data.push([task.title, task.description, task.started_at]));
  const config = {
    columns: {
      1: {
        width: 30,
      },
    },
  };
  log(table(data, config));
};
