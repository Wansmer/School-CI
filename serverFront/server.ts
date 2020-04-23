import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();

const app = express();
const { Builder } = require('./app/Builder');
const builder = new Builder();

app.use(cors());
app.use(morgan('dev'));

import routerConf from './routes/settings';
import routerBuild from './routes/builds';

app.use('/api/settings', routerConf);
app.use('/api/builds', routerBuild);

builder.checkQueueAndRun();

app.listen(3001);

module.exports = app;
