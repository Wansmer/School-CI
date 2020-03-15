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
    res.render('settings', { data });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', jsonParser, async (req, res) => {
  const data = req.body;
  try {
    await conf.setConf(data);
    const createBrancDir = cp.fork('app/createBranchDir.js');
    createBrancDir.send(data);
  } catch (error) {
    console.log(error);
  }
})

router.delete('/', (req, res) => {
  conf.deleteConf().then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  })
});

module.exports = router;
