const { Conf } = require('../api/conf/conf');
const conf = new Conf();
const { GIT_PATH } = require('../constants');
const { GitHelper } = require('../app/GitHelper');

const gitHelper = new GitHelper(GIT_PATH);

exports.ConfController = class {

  constructor () {
    this.getConf = conf.getConf;
    this.setConf = conf.setConf;
    this.deleteConf = conf.deleteConf;
    this.cloneRepo = gitHelper.cloneRepo;
  }

  getSettings = async (req, res) => {
    try {
      const response = await this.getConf();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }

  setSettings = async (req, res) => {
    const data = req.body;
    try {
      await this.setConf(data);
      const result = await this.cloneRepo(data);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }

  deleteSettings = async (req, res) => {
    try {
      await this.deleteConf();
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  }
}
