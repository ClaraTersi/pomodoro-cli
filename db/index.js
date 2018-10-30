const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/data.json');
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
