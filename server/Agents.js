const { Agent } = require('./Agent');
const { makeUrl } = require('./utils');

class Agents {
  constructor () {
    this.agents = [];
  }

  add = (agent) => {
    this.agents.push(new Agent(agent));
  }

  delete = ({ host, port }) => {
    const deleted = this.agents.findIndex(item => item.port === port && item.host === host);
    this.agents.splice(deleted, 1);
  }

  getAllAgents = () => {
    return this.agents;
  }

  getFreeAgents = () => {
    return this.agents.filter(item => item.isFree);
  }

  countFreeAgents = () => {
    return this.agents.filter(item => item.isFree).length;
  }

  changeFreeStatus = (id) => {
    try {
      this.agents.find(item => item.getUrl() === makeUrl(id)).changeIsFree();
    } catch (error) {
      this.add(id);
    }
  }

  getBusyAgentByBuildId = (id) => {
    return this.agents.find(item => item.currentBuild === id);
  }
}

module.exports = { Agents };
