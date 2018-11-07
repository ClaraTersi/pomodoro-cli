#!/usr/bin/env node

const program = require('commander');
const commands = require('./commands');

program
  .version('1.0.0', '-v, --version');

program
  .command('start')
  .description('starts a 25 minute pomodoro timer')
  .action(commands.start);

program
  .command('report')
  .description('generate simple report of your tasks')
  .action(commands.report);

program.parse(process.argv);
