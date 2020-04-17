const { CiSettings } = require('./CiSettings');
const settings = new CiSettings();

const { Agents } = require('./Agents');
const agents = new Agents();

const { API } = require('./api');
const api = new API();

const { Queue } = require('./Queue');
const queue = new Queue();

const { isPingSuccess } = require('./utils');

const preparation = async () => {
  let result = false;
  while (!result) {
    result = await settings.update();
  }
};

const processResult = async ({ result, id }) => {
  try {
    agents.changeFreeStatus(id);

    await api.setBuildFinish(result);

    queue.delete(result.buildId);

    return { status: 200 };
  } catch (error) {
    return error;
  }
};

const updateQueue = async () => {
  setTimeout(updateQueue, 5000);
  if (!queue.size()) {
    await queue.update();
  }
};

const sendToBuilding = async () => {

  const freeAgent = agents.getFreeAgents();

  for (const agent of freeAgent) {
    try {
      const { id, commitHash } = queue.next();
      const { repoName, buildCommand } = settings.getSettings();
      const dateTime = new Date().toISOString();

      agent.changeIsFree(id);

      await agent.sendBuild({
        id,
        repoName,
        commitHash,
        buildCommand,
        dateTime
      });

      queue.setStatus(id, 'inProgress');

      const data = { buildId: id, dateTime: dateTime };

      await api.setBuildStart(data);
    } catch (e) {
      console.error(error.message);
    }
  }
};

const checkQueue = () => {
  if (queue.size()) {
    sendToBuilding();
  }
  setTimeout(checkQueue, 1000);
};

const checkFreezingProcesses = async () => {
  for (const agent of agents.getAllAgents()) {
    const isPing = await isPingSuccess({ host: agent.host, port: agent.port });
    if (!isPing) {
      if (!agent.isFree) queue.setStatus(agent.currentBuild, 'Waiting');
      agents.delete({ host: agent.host, port: agent.port });
    }
  }
  setTimeout(checkFreezingProcesses, 10000);
};

const notifyAgent = async (req, res) => {
  try {
    agents.add(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};

const notifyBuildResult = (req, res) => {
  res.sendStatus(200);
  processResult(req.body);
};

module.exports = {
  notifyAgent,
  notifyBuildResult,
  checkQueue,
  updateQueue,
  preparation,
  checkFreezingProcesses
};
