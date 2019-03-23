const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const os = require('os');
const path = require('path');

const moment = require('moment');

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
      label: label.toUpperCase(),
      description,
      started_at: new Date(),
      finished_at: '',
      time_elapsed: '',
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
  const finishTime = new Date();
  const task = db.get('tasks')
    .find({ id })
    .value();
  const duration = moment.duration(finishTime - task.started_at);
  const timeElapsed = `${duration.hours()}h ${duration.minutes()}m`;
  return db.get('tasks')
    .find({ id })
    .assign({ finished_at: finishTime, time_elapsed: timeElapsed })
    .write();
};

const getLabels = () => {
  const allLabels = db.get('tasks').map('label').value();
  const uniqueLabels = Array.from(new Set(allLabels));
  return uniqueLabels;
};

module.exports = {
  addTask,
  listTasks,
  getSingleTask,
  currentTaskId,
  setTaskFinishTime,
  getLabels,
};
