const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ extended: false });

const { Agent } = require('./Agent');

const config = require('./server-conf.json');
const PORT = config.port;

app.use(cors());
app.use(morgan('dev'));

const { API } = require('./api');
const api = new API();

const { CiSettings } = require('./CiSettings');
const settings = new CiSettings();

settings.update();

const { Queue } = require('./Queue');
const queue = new Queue();

setInterval(queue.update, 1000);

const agents = [];

app.post('/notify-agent', jsonParser, async (req, res) => {
  try {
    const agent = new Agent(req.body);
    // TODO: поставить проверку, что агент с таким урлом не существует в списке агентов
    agents.push(agent);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(error.code);
  }
});

app.post('/notify-build-result', jsonParser, (req, res) => {
  res.sendStatus(200);
  console.log(req.body);
  processResult(req.body);
});

const makeUrl = ({ host, port }) => {
  return `http://${ host }:${ port }`;
}

const processResult = async ({ result, id }) => {
  try {
    result.duration = +result.duration;
    await api.setBuildFinish(result);
    agents.find(item => item.getUrl() === makeUrl(id)).setIsFree(true);
    return { status: 200 };
  } catch (error) {
    return error;
  }
}

const sendToBuilding = async () => {

  const freeAgent = agents.filter(item => item.isFree);

  for (const agent of freeAgent) {
    try {
      const { id, commitHash } = queue.next();
      const { repoName, buildCommand } = settings.getSettings();
      // id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
      const dateTime = new Date().toISOString();
      current.dateTime = dateTime;
      await agent.sendBuild(current);
      agent.setIsFree(false);
      queue.setStatus(current.id, 'inProgress');
      const data = {
        buildId: current.id,
        dateTime: dateTime
      };
      await api.setBuildStart(data);
    } catch (e) {
      console.log('Error from setBuildStart');
    }
  }
}

const checkQueue = () => {
  if (queue.size()) {
    sendToBuilding();
  }
  setTimeout(checkQueue, 1000);
}

checkQueue();

app.listen(PORT);
