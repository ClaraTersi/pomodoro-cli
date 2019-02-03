const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const os = require('os');
const path = require('path');

const dataFile = path.join(os.homedir(), 'pomodoro-data.json');
const adapter = new FileSync(dataFile);
const db = low(adapter);

db.defaults({
  tasks: [],
  configuration: {
    next_id: 1,
  },
}).write();

const addTask = (label = '', description = '') => {
  const nextId = db.get('configuration.next_id').value();
  db.get('tasks')
    .push({
      id: nextId,
      label,
      description,
      started_at: new Date(),
      finished_at: '',
    })
    .write();
  db.set('configuration.next_id', nextId + 1).write();
};

const listTasks = () => {
  return db.get('tasks')
    .value();
};

const getSingleTask = (taskLabel) => {
  return db.get('tasks')
    .filter(tasks => tasks.label === taskLabel)
    .value();
};

module.exports = {
  addTask,
  listTasks,
  getSingleTask,
};
