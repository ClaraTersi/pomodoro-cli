#!/usr/bin/env node

const program = require('commander');
const commands = require('./commands');

program
  .version('1.0.0', '-v, --version');

program
  .command('start')
  .description('starts a 25 minute pomodoro timer')
  .action(commands.start);

program.parse(process.argv);
