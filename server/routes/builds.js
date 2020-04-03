const express = require('express');
const util = require('util');
const router = express.Router();
const bodyParser = require('body-parser');
const { spawn, fork, exec } = require('child_process');
const promExec = util.promisify(exec);
const { watcher } = require('../app/watcher');
const jsonParser = bodyParser.json({extended: false});
const { queueAPI } = require('../queueAPI');

const build = require('../api/build/build');
const conf = require('../api/conf/conf');

const QuAPI = new queueAPI('./storage/queue.txt');

const statuses = {
  'Waiting': "Ticket_status_process",
  'InProgress': "Ticket_status_process",
  'Success': "Ticket_status_success",
  'Fail': "Ticket_status_error",
  'Canceled': "Ticket_status_success",
  undefined: ''
  }

router.get('/', async (req, res) => {
  try {
    const response = await build.getBuildList();
    const data = response;
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.get('/:buildId/logs', async (req, res) => {
  try {
    const response = await build.getBuildLog(req.params.buildId);
    let data = response.data;
    data = JSON.stringify(data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.get('/:buildId', async (req, res) => {
  try {
    const response = await build.getBuildDetails(req.params.buildId);
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.post('/:commitHash', jsonParser, async (req, res) => {
  let settings = await conf.getConf();
  // let test = await promExec(`git log ${req.params.commitHash} -n 1 --pretty=format:%an:::%s:::%D`, { cwd: `./clone/${settings.repoName}`});
  // const [ authorName, commitMessage, branchName ] = test.stdout.split(':::');
  // const commitInfo = {
  //   authorName, 
  //   commitMessage, 
  //   commitHash: req.params.commitHash,
  //   branchName: branchName.split(', ')[branchName.split(', ').length - 1] || 'master'
  // }
  // const buildInfo = await build.setBuildRequest(commitInfo);
  // QuAPI.addLine(commitInfo.commitHash, buildInfo);
  // res.sendStatus(200);
  const git = spawn('git', ['log', req.params.commitHash, '-n 1', '--pretty=format:{"authorName": "%an", "commitMessage": "%s", "commitHash": "%h","branchName": "%D"}'], { cwd: `./clone/${settings.repoName}`});
  git.stdout.on('data', (data) => {
    const commitInfo = JSON.parse(data);
    if (commitInfo.branchName === '') commitInfo.branchName = 'master';
    build.setBuildRequest(commitInfo)
    .then((buildInf) => {
      console.log(buildInf);
      QuAPI.addLine(commitInfo.commitHash, buildInf);
      const buildId = buildInf.id;
      const startBuild = fork('app/building.js');
      startBuild.send({ settings, commitInfo, buildId });
      startBuild.on('exit', (code) => {
        console.log('Код завершения процесса:', code);
      })
      res.send(buildInf);
    })
    .catch((error) => {
      throw error;
    });
  });
  git.stderr.on('data', (data) => {
    res.send(data);
  });
})

module.exports = router;
