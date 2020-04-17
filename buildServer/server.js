const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const { checkQueue, updateQueue, preparation, checkFreezingProcesses } = require('./controllers');

const PORT = require('./server-conf.json').port;

app.use(cors());
app.use(morgan('dev'));

const router = require('./routing');
app.use('/', router);

// Подготовка: цикл запроса настроек CI с сервера.
preparation();

// Обновление очереди
updateQueue();

// Проверка очереди
checkQueue();

// проверка доступности агентов
checkFreezingProcesses();

app.listen(PORT);
