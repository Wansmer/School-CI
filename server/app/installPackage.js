const { installPackage, startBuild, goToCommit } = require('./process');

process.on('message', (data) => {
  console.log(data);
  installPackage(data.settings)
  .then((res) => {
    goToCommit(data.commitInfo.commitHash, data.settings);
    return res;
  })
  .then((res) => {
    let log = startBuild(data.settings);
    process.send('log');
    return res;
  })
  .then((log) => {
    console.log('Build complite');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
});
