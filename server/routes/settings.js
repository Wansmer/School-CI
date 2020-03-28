const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cp = require('child_process');
const { REPO_NAME } = require('../constants');
const jsonParser = bodyParser.json({extended: false});

const conf = require('../api/conf/conf');

router.get('/', async (req, res) => {
  try {
    const response = await conf.getConf();
    const data = {};
    for (const prop in response) {
      data[prop] = response[prop];
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', jsonParser, async (req, res) => {
  const data = req.body;
  try {
    await conf.setConf(data);
    const cloneRepo = cp.fork('app/cloneRepo.js');
    cloneRepo.send(data);
    await cloneRepo.on('message', (message) => {
      console.log(message);
      res.send(message);
    })
  } catch (error) {
    res.send(error);
  }
})

router.delete('/', (req, res) => {
  conf.deleteConf().then((response) => {
    res.render('/');
  }).catch((error) => {
    res.send(error);
  })
});

module.exports = router;
