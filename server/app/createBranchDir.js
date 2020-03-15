const { cloneRepo } = require('./process');
const fork = require('child_process');

process.on('message', (data) => {
  cloneRepo(data)
    .then((res) => {
      console.log('End of cloning repo');
      return data;
    })
    .then((data) => {
      console.log('Defines watcher');
      return true;
    })
})
