const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));

const routerConf = require('./routes/settings');
const routerBuild = require('./routes/builds');

app.use('/api/settings', routerConf);
app.use('/api/builds', routerBuild);

const { checkQueueAndRun } = require('./app/process');

checkQueueAndRun();

app.listen(3001);
