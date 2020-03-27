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
    // TODO: Переписать на отдачу JSON 
    res.render('settings', { data });
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
    cloneRepo.on('exit', (code) => {
      console.log('Код завершения процесса: ', code);
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
