const path = require('path');
const fs = require('fs');
const util = require('util');
const express = require('express');
const cors = require('cors');
const readFile = util.promisify(fs.readFile);
const { queueAPI } = require('./queueAPI');
const app = express();
require('dotenv').config();

const QuAPI = new queueAPI('./storage/queue.txt');

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const routerConf = require('./routes/settings');
const routerBuild = require('./routes/builds');

app.use(express.static(path.resolve(__dirname, 'static')));
app.get('/', (req, res) => {
  res.render('index')
});
app.use('/api/settings', routerConf);
app.use('/api/builds', routerBuild);

const { checkQueueAndRun } = require('./app/process');

// const { clearNodeModules, installPackage, goToCommit, startBuild } = require('./app/process');
// const conf = require('./api/conf/conf');
// const build = require('./api/build/build');

// async function runBuildFromQueue(current) {
//   const settings = await conf.getConf();
//   const commitHash = JSON.parse(current).commitHash;
//   const buildId = JSON.parse(current).id;
//   await clearNodeModules(settings);
//   await goToCommit(commitHash, settings);
//   await installPackage(settings);
//   QuAPI.setStatus(JSON.parse(current).id, 'inProgress');
//   const start = new Date().toISOString();
//   build.setBuildStart({ buildId: buildId, dateTime: start });
//   const buildLogObject = await startBuild(settings);
//   const status = !(buildLogObject instanceof Error);
//   const buildLog = buildLogObject.stderr + buildLogObject.stdout;
//   const buildEnd = {
//     "buildId": buildId,
//     "duration": Date.now() - new Date(start),
//     "success": status,
//     "buildLog": buildLog
//   }
//   build.setBuildFinish(buildEnd);
//   QuAPI.deleteLine(JSON.parse(current).id);
// }

// async function checkQueueAndRun () {
//   const data = await readFile('./storage/queue.txt', 'utf8');
//   for (const current of data.split('\n').filter(item => !!item)) {
//     await runBuildFromQueue(current);
//   }
//   console.log('restart check');
//   setTimeout(checkQueueAndRun, 10000);
// }

checkQueueAndRun();

app.listen(3001);
