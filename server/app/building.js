const { installPackage, startBuild, goToCommit, clearNodeModules } = require('./process');
const build = require('../api/build/build');

process.on('message', (data) => {
  clearNodeModules(data.settings)
  .then(() => {
    return installPackage(data.settings);
  })
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
    const status = !(arr[1] instanceof Error);
    const buildLog = arr[1].stderr + arr[1].stdout;
    // console.log(buildLog);
    const buildEnd = {
      "buildId": data.buildId,
      "duration": Date.now() - new Date(arr[0].data.start),
      "success": status,
      "buildLog": buildLog
    }
    console.log(Date.now() - new Date(arr[0].data.start));
    return build.setBuildFinish(buildEnd);
  })
  .then((res) => {
    return true;
  })
  .catch((error) => {
    throw error;
  })
  .finally(() => {
    process.exit(0);
  });
});
