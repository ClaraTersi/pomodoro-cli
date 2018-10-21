const notifier = require('node-notifier');

const notify = () => {
  notifier.notify({
    title: 'Time\'s up!',
    message: 'Pomodoro timer finished',
    sound: true,
  });
};

module.exports = {
  notify,
};
