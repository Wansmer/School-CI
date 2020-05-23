import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));

import routerConf from './routes/settings';
import routerBuild from './routes/builds';

app.use('/api/settings', routerConf);
app.use('/api/builds', routerBuild);

app.listen(3001);
