const { cloneRepo } = require('./process');

process.on('message', (data) => {
  cloneRepo(data)
    .then((res) => {
      process.send(data);
    })
    .catch((error) => {
      process.send(error);
    })
    .finally((res) => {
      process.exit(0);
    })
});
