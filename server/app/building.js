const { installPackage, startBuild, goToCommit } = require('./process');
const build = require('../api/build/build');

process.on('message', (data) => {
  console.log('start install package ------- OK');
  installPackage(data.settings)
  .then(() => {
    console.log('package install complite ------- OK');
    console.log('checkout branch start ------- OK');
    return goToCommit(data.commitInfo.commitHash, data.settings);
  })
  .then(() => {
    console.log('checkout branch success ------- OK');
    console.log('send start info on server ------- OK');
    const buildStart = {
      buildId: data.buildId,
      dateTime: new Date().toISOString()
    }
    return build.setBuildStart(buildStart);
  })
  .then(() => {
    console.log('start info sended ------- OK');
    console.log('start builing ------- OK');
    let start = build.getBuildDetails(data.buildId);
    let buildLog = startBuild(data.settings);
    return Promise.all([start, buildLog]);
  })
  .then((arr) => {
    console.log('building end ------- OK');
    console.log('send end info on server ------- OK');
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
    console.log('end info sended ------- OK');
    console.log('exit of child process ------- OK');
    return true;
  })
  .catch((error) => {
    console.log(error);
    throw error;
  })
  .finally(() => {
    process.exit(0);
  });
});
