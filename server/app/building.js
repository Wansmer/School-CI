const { installPackage, startBuild, goToCommit } = require('./process');
const build = require('../api/build/build');

process.on('message', (data) => {
  installPackage(data.settings)
  .then((res) => {
    goToCommit(data.commitInfo.commitHash, data.settings);
    return res;
  })
  .then((res) => {
    const buildStart = {
      buildId: data.buildId,
      dateTime: new Date().toISOString()
    }
    return build.setBuildStart(buildStart);
  })
  .then((res) => {
    let start = build.getBuildDetails(data.buildId);
    let buildLog = startBuild(data.settings);
    return Promise.all([start, buildLog]);
  })
  .then((arr) => {
    console.log(arr[0].data.start);
    const buildEnd = {
      "buildId": data.buildId,
      "duration": Date.now() - new Date(arr[0].data.start),
      "success": true,
      "buildLog": arr[1]
    }
    // TODO: поставить обработчик на неудачную сборку
    return build.setBuildFinish(buildEnd);
  })
  .then((res) => {
    console.log('Build complite');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
});
