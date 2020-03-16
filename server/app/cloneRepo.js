const { cloneRepo } = require('./process');

process.on('message', (data) => {
  cloneRepo(data)
    .then((res) => {
      process.exit(0);
    })
    .catch((error) => {
      throw error;
    })
    .finally((res) => {
      process.exit(0);
    })
});
