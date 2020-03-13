const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const routerConf = require('./routes/conf');
const routerBuild = require('./routes/build');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/conf', routerConf);
app.use('/build', routerBuild);

app.listen(3000);
