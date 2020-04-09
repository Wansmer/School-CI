const bodyParser = require('body-parser');
const cp = require('child_process');
const jsonParser = bodyParser.json({extended: false});

const { Conf } = require('../api/conf/conf');
const conf = new Conf();

exports.ConfController = class {

  constructor () {
    this.getConf = conf.getConf;
    this.setConf = conf.setConf;
    this.deleteConf = conf.deleteConf;
  }

  getSettings = async (req, res) => {
    try {
      const response = await this.getConf();
      const data = {};
      for (const prop in response) {
        data[prop] = response[prop];
      }
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }

  setSettings = async (req, res) => {
    const data = req.body;
    try {
      await this.setConf(data);
      const cloneRepo = cp.fork('app/cloneRepo.js');
      cloneRepo.send(data);
      await cloneRepo.on('message', (data) => {
        res.send(data);
      });
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
