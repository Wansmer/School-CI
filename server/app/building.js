const { installPackage, startBuild, goToCommit, clearNodeModules } = require('./process');
const build = require('../api/build/build');

process.on('message', (data) => {
  clearNodeModules(data.settings)
  .then(() => {
    console.log('Start go to commit....');
    return goToCommit(data.commitInfo.commitHash, data.settings);
  })
  .then(() => {
    console.log('Start install package....');
    return installPackage(data.settings);
  })
  .then(() => {
    console.log('Start build....');
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
    console.log('End of building....');
    const status = !(arr[1] instanceof Error);
    const buildLog = arr[1].stderr + arr[1].stdout;
    const buildEnd = {
      "buildId": data.buildId,
      "duration": Date.now() - new Date(arr[0].data.start),
      "success": status,
      "buildLog": buildLog
    }
    return build.setBuildFinish(buildEnd);
  })
  .then((res) => {
    console.log('Success send to build finish', res);
    process.exit(0);
    return res;
  })
  .catch((error) => {
    console.log('catch block', error);
    throw error;
  })
  .finally(() => {
    process.exit(0);
  });
});
