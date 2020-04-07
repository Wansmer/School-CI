const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const { checkQueueAndRun } = require('./app/process');

app.use(cors());
app.use(morgan('dev'));

const routerConf = require('./routes/settings');
const routerBuild = require('./routes/builds');

app.use('/api/settings', routerConf);
app.use('/api/builds', routerBuild);


checkQueueAndRun();

app.listen(3001);
