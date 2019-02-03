const { log } = console;
const chalk = require('chalk');
const { getLabels } = require('../db');

module.exports = () => {
  const labels = getLabels().sort();
  labels.forEach(label => log(chalk.green.bold(label)));
};
