const { cloneRepo } = require('./process');

process.on('message', (data) => {
  cloneRepo(data)
    .then((res) => {
      process.exit();
    })
    .catch((error) => {
      throw error;
    })
})
