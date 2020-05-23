const { API } = require('./api');
const api = new API();

class CiSettings {
  constructor () {
    this.repoName = '';
    this.mainBranch = '';
    this.buildCommand = '';
    this.period = '';
  }

  update = async () => {
    try {
      const { repoName, buildCommand, mainBranch, period } = await api.getConf();
      this.repoName = repoName;
      this.mainBranch = mainBranch;
      this.buildCommand = buildCommand;
      this.period = period;
      return true;
    } catch (error) {
      console.log('Ошибка получения настроек', error.code);
      return false;
    }
  }

  getSettings = () => {
    return {
      repoName: this.repoName,
      buildCommand: this.buildCommand,
      mainBranch: this.mainBranch,
      period: this.period
    }
  }
}

module.exports = { CiSettings };
