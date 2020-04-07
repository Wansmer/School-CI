const { cloneRepo } = require('./process');

process.on('message', (data) => {
  cloneRepo(data)
    .then(() => {
      process.send({code: 200});
    })
    .catch((error) => {
      process.send(error);
    })
    .finally(() => {
      process.exit(0);
    });
});
