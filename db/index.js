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
    current_task_id: 0,
  },
}).write();

const currentTaskId = () => {
  return db.get('configuration.current_task_id').value();
};

const addTask = (label = '', description = '') => {
  const currentId = db.get('configuration.current_task_id').value();
  const nextId = currentId + 1;
  db.set('configuration.current_task_id', nextId).write();
  db.get('tasks')
    .push({
      id: nextId,
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

const setTaskFinishTime = (id) => {
  return db.get('tasks')
    .find({ id })
    .assign({ finished_at: new Date() })
    .write();
};

module.exports = {
  addTask,
  listTasks,
  getSingleTask,
  currentTaskId,
  setTaskFinishTime,
};
