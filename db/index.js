const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const os = require('os');
const path = require('path');

const dataFile = path.join(os.homedir(), 'pomodoro-data.json');
const adapter = new FileSync(dataFile);
const db = low(adapter);

db.defaults({ tasks: [] })
  .write();

const addTask = (title = '', description = '') => {
  db.get('tasks')
    .push({ title, description, started_at: new Date() })
    .write();
};

const listTasks = () => {
  return db.get('tasks')
    .value();
};

module.exports = {
  addTask,
  listTasks,
};
