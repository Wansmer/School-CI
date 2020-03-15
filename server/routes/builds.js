const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { spawn, fork, exec } = require('child_process');
const jsonParser = bodyParser.json({extended: false});

const build = require('../api/build/build');
const conf = require('../api/conf/conf');

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
    const response = await build.getBuildList(0, 9);
    const data = response.data;
    res.render('builds', { data, statuses });
  } catch (error) {
    console.log(error);
  }
})

router.get('/:buildId/logs', async (req, res) => {
  try {
    const response = await build.getBuildLog(req.params.buildId);
    let data = response.data;
    data = JSON.stringify(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})

router.get('/:buildId', async (req, res) => {
  try {
    const response = await build.getBuildDetails(req.params.buildId);
    const data = response.data;
    res.render('details', { data, statuses });
  } catch (error) {
    console.log(error);
  }
})

router.post('/:commitHash', jsonParser, async (req, res) => {
  let settings = await conf.getConf();
  const git = spawn('git', ['log', req.params.commitHash, '-n 1', '--pretty=format:{"authorName": "%an", "commitMessage": "%s", "commitHash": "%h","branchName": "%D"}'], { cwd: './clone/testOfBuild/'});
  git.stdout.on('data', (data) => {
    const commitInfo = JSON.parse(data);
    build.setBuildRequest(commitInfo).then((response) => {
      const startBuild = fork('app/installPackage.js');
      startBuild.send({ settings, commitInfo });
      startBuild.on('exit', (code) => {
        if (!code) {
          // TODO: установить вотчер на обновление репозитория
          console.log('Defined watcher...');
        }
      });
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err);
    });
  });
  git.stderr.on('data', (data) => {
    console.log(data);
  });
})

module.exports = router;
