const { pullRepo, goToCommit } = require('./process');
const MIN = 1000 * 60;

exports.watcher = (data) => {
  setTimeout(() => {
    goToCommit(data.mainBranch, data)
      .then(() => {
        return pullRepo(data);
      })
      .then(() => {
        watcher(data);
      })
  }, MIN * data.period);
};
