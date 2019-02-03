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
    current_id: 0,
  },
}).write();

const addTask = (label = '', description = '') => {
  const currentId = db.get('configuration.current_id').value();
  const taskId = currentId + 1;
  db.set('configuration.current_id', taskId).write();
  db.get('tasks')
    .push({
      id: taskId,
      label,
      description,
      started_at: new Date(),
      finished_at: '',
    })
    .write();
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
