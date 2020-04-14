const config = require('./server-conf.json');
const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

const PORT = config.port;

app.use(cors());
app.use(morgan('dev'));

const { API } = require('./api');
const api = new API();

let buildsList = [];

const getBuilds = async () => {
  buildsList = await api.getBuildList();
  buildsList = buildsList.filter((elem) => elem.status === 'Waiting');
  console.log(buildsList);
}

getBuilds();

api.getConf().then(d => console.log(d));

app.listen(PORT);
