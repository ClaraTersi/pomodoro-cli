const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const os = require('os');
const path = require('path');

const dataFile = path.join(os.homedir(), 'pomodoro-data.json');
const adapter = new FileSync(dataFile);
const db = low(adapter);

db.defaults({ tasks: [] })
  .write();

const addTask = (id = '', description = '') => {
  db.get('tasks')
    .push({
      id,
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

const getSingleTask = (taskId) => {
  return db.get('tasks')
    .filter(tasks => tasks.id === taskId)
    .value();
};

module.exports = {
  addTask,
  listTasks,
  getSingleTask,
};
