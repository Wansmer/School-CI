const { cloneRepo } = require('./process');
const fork = require('child_process');

process.on('message', async (data) => {
  try {
    await cloneRepo(data);
    process.exit();
  } catch (error) {
    return error;
  }
})
