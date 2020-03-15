const { installPackage, startBuild, goToCommit } = require('./process');

installPackage()
  .then((res) => {
    goToCommit('a21cb76');
    return res;
  })
  .then((res) => {
    startBuild();
    return res;
}).then((res) => {
  console.log('Build complite');
  process.exit();
});
