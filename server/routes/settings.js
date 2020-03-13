const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const conf = require('../api/conf/conf');
const jsonParser = bodyParser.json({extended: false});

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
})

router.post('/', jsonParser, (req, res) => {
  conf.setConf(req.body).then((response) => {
    // TODO: Переадресация на страницу сборок
  }).catch((error) => {
    console.log(error);
  })
})

module.exports = router;
