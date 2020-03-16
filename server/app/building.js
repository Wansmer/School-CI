const { installPackage, startBuild, goToCommit } = require('./process');
const build = require('../api/build/build');

process.on('message', (data) => {
  console.log('start install package ------- OK');
  installPackage(data.settings)
  .then(() => {
    return goToCommit(data.commitInfo.commitHash, data.settings);
  })
  .then(() => {
    const buildStart = {
      buildId: data.buildId,
      dateTime: new Date().toISOString()
    }
    return build.setBuildStart(buildStart);
  })
  .then(() => {
    let start = build.getBuildDetails(data.buildId);
    let buildLog = startBuild(data.settings);
    return Promise.all([start, buildLog]);
  })
  .then((arr) => {
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
    console.log(res);
    console.log('end of building ---------------- OK')
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    throw error;
  });
});
