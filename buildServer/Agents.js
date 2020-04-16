const { Agent } = require('./Agent');
const { makeUrl } = require('./utils');

class Agents {
  constructor () {
    this.agents = [];
  }

  add = (agent) => {
    this.agents.push(new Agent(agent));
  }

  getFreeAgents = () => {
    return this.agents.filter(item => item.isFree);
  }

  countFreeAgents = () => {
    return this.agents.filter(item => item.isFree).length;
  }

  changeFreeStatus = (id) => {
   const agent = this.agents.find(item => item.getUrl() === makeUrl(id));
   agent.changeIsFree();
   console.log(agent);
  }

}

module.exports = { Agents };
