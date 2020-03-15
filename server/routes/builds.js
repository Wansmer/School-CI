const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { spawn, fork } = require('child_process');
const jsonParser = bodyParser.json({extended: false});

const build = require('../api/build/build');

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
    let response = await build.getBuildDetails(req.params.buildId);
    const data = response.data;
    const log = await build.getBuildLog(req.params.buildId);
    const ticketLog = log.data;
    res.render('details', { data, statuses, ticketLog });
  } catch (error) {
    console.log(error);
  }
})

router.post('/:commitHash', jsonParser, async (req, res) => {
  const git = spawn('git', ['log', req.params.commitHash, '-n 1', '--pretty=format:{"authorName": "%an", "commitMessage": "%s"}'], { cwd: './clone/testOfBuild_master/'});
  git.stdout.on('data', (data) => {
    const commitInfo = JSON.parse(data);
    const sendData = {
      "commitMessage": commitInfo.commitMessage,
      "commitHash": req.params.commitHash,
      "branchName": "master",
      "authorName": commitInfo.authorName
    }
    build.setBuildRequest(sendData).then((response) => {
      fork('app/installPackage.js');
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
