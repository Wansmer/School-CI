const { getCommitInfo } = require('../app/process');
const { queueAPI } = require('../queueAPI');
const { Build } = require('../api/build/build');
const { Conf } = require('../api/conf/conf');

const build = new Build();
const conf = new Conf();

const QuAPI = new queueAPI('./storage/queue.txt');

exports.BuildController = class  {

  constructor () {
    this.getBuildList = build.getBuildList;
    this.getBuildLog = build.getBuildLog;
    this.getBuildDetails = build.getBuildDetails;
    this.setBuildRequest = build.setBuildRequest;
    this.getConf = conf.getConf;
    this.getCommitInfo = getCommitInfo;
    this.QuAPI = QuAPI;
  }

  fetchBuildsList = async (req, res) => {
    try {
      const response = await this.getBuildList();
      const data = response;
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }

  fetchBuildLog = async (req, res) => {
    const buildId = req.params.buildId;
    try {
      const response = await this.getBuildLog(buildId);
      let data = JSON.stringify(response.data);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }

  fetchBuildDetails = async (req, res) => {
    const buildId = req.params.buildId;
    try {
      const response = await this.getBuildDetails(buildId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }

  sendBuildRequest = async (req, res) => {
    const commitHash = req.params.commitHash;
    try {
      const settings = await this.getConf();
      const commitInfo = await this.getCommitInfo(commitHash, settings);
      const buildInfo = await this.setBuildRequest(commitInfo);
      this.QuAPI.addLine(commitInfo.commitHash, buildInfo, settings);
      buildInfo.code = 200;
      res.send(buildInfo);
    } catch (error) {
      res.send(error);
    }
  }
}