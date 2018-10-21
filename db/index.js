const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/data.json');
const db = low(adapter);

db.defaults({ history: [] })
  .write();

const addTask = (task = '', description = '') => {
  db.get('history')
    .push({ task, description, datetime: new Date() })
    .write();
};

module.exports = {
  addTask,
};
