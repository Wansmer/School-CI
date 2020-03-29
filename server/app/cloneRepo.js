const { cloneRepo } = require('./process');

process.on('message', (data) => {
  cloneRepo(data)
    .then((res) => {
      process.send({code: 200});
    })
    .catch((error) => {
      process.send(error);
    })
    .finally((res) => {
      process.exit(0);
    })
});
