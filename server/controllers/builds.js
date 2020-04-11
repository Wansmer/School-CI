const { queueAPI } = require('../queueAPI');
const { Build } = require('../api/build/build');
const { Conf } = require('../api/conf/conf');
const { GIT_PATH } = require('../constants');
const { GitHelper } = require('../app/GitHelper');

const gitHelper = new GitHelper(GIT_PATH);

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
    this.getCommitInfo = gitHelper.getCommitInfo;
    this.QuAPI = QuAPI;
  }

  fetchBuildsList = async (req, res) => {
    try {
      const response = await this.getBuildList();
      res.send(response);
    } catch (error) {
      res.send([]);
    }
  }

  fetchBuildLog = async (req, res) => {
    const buildId = req.params.buildId;
    try {
      const response = await this.getBuildLog(buildId);
      let data = response.data;
      data = JSON.stringify(data);
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
      console.log('commitInfo START');
      const commitInfo = await this.getCommitInfo(commitHash, settings);
      console.log('commitInfo DONE');
      const buildInfo = await this.setBuildRequest(commitInfo);
      console.log('buildInfo DONE');
      this.QuAPI.addLine(commitInfo.commitHash, buildInfo, settings);
      buildInfo.code = 200;
      res.send(buildInfo);
    } catch (error) {
      res.send(error);
    }
  }
}