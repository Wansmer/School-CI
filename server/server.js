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

// TODO: проработать очередь

// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 1000));
// }

// async function delayedLog(item) {
//   await delay();
//   if (item.length) QuAPI.setStatus(JSON.parse(item).id, 'inProgress');
//   await delay();
//   if (item.length) QuAPI.deleteLine(JSON.parse(item).id);
// }

// async function startBuildFromQueue () {
//   const data = await readFile('./storage/queue.txt', 'utf8');
//   for (const line of data.split('\n')) {
//     await delayedLog(line);
//   }
//   console.log('restart');
//   setInterval(startBuildFromQueue, 10000);
// }

// startBuildFromQueue();

app.listen(3001);
