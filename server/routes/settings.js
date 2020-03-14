const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cp = require('child_process');
const jsonParser = bodyParser.json({extended: false});

const conf = require('../api/conf/conf');

router.get('/', (req, res) => {
  conf.getConf().then((response) => {
    const data = {};
    for (const prop in response.data) {
      data[prop] = response.data[prop];
    }
    res.render('settings', { data });
  }).catch((error) => {
    console.log(error);
  })
});

router.post('/', jsonParser, (req, res) => {
  const data = req.body;
  conf.setConf(req.body).then((response) => {
    const createBrancDir = cp.fork('app/createBranchDir.js');
    createBrancDir.send(data);
    const installPackage = cp.fork('app/installPackage.js');
    installPackage.send(data);
    // TODO: Переадресация на страницу сборок
  }).catch((error) => {
    console.log(error);
  })
})

module.exports = router;
