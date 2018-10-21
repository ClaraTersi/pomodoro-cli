const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/data.json');
const db = low(adapter);

db.defaults({ history: [] })
  .write();

const addTask = (title = '', description = '') => {
  db.get('tasks')
    .push({ title, description, started_at: new Date() })
    .write();
};

module.exports = {
  addTask,
};
