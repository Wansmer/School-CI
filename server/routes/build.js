const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const build = require('../api/build/build');
const jsonParser = bodyParser.json({extended: false});

router.get('/', (req, res) => {
  build.getBuildList(1, 9).then((response) => {
    const statuses = {
      'Waiting': "Ticket_status_process",
      'InProgress': "Ticket_status_process",
      'Success': "Ticket_status_success",
      'Fail': "Ticket_status_error",
      'Canceled': "Ticket_status_success",
      undefined: ''
      }
    const data = response.data;
    res.render('build', { data, statuses });
  }).catch((error) => {
    console.log(error);
  })
})

module.exports = router;
