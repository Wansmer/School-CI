const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { launchNotification } = require('./controllers');
const { PORT } = require('./constants');

app.use(cors());
app.use(morgan('dev'));

const router = require('./routing');
app.use('/', router);

// уведомление о запуске на билд сервер
launchNotification();

app.listen(PORT);
