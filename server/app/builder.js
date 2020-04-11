const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile);
const { GIT_PATH } = require('../constants');

const { queueAPI } = require('../queueAPI');
const QuAPI = new queueAPI('./storage/queue.txt');

const { Build } = require('../api/build/build');
const build = new Build();

const { GitHelper } = require('../app/GitHelper');
const gitHelper = new GitHelper(GIT_PATH);

exports.Builder = class {

  clearNodeModules = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await exec('rm -Rf node_modules', settings);
    } catch (error) {
      throw error;
    }
  };

  installPackage = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await exec('npm i', settings);
    } catch (error) {
      throw error;
    }
  };

  dirPreparation = async (commitHash, settings) => {
    try {
      await this.clearNodeModules(settings);
      await gitHelper.goToCommit(commitHash, settings);
      await this.installPackage(settings);
    } catch (error) {
      console.log('ERROR FROM DIR_PREPARATION: ', error);
      throw error;
    }
  };

  startBuild = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
      return { stdout, stderr };
    } catch (error) {
      return error;
    }
  };

  building = async (buildId, settings) => {
    try {
      QuAPI.setStatus(buildId, 'inProgress');
      const dateTime = new Date().toISOString();
      await build.setBuildStart({ buildId, dateTime });
      const buildLogObject = await this.startBuild(settings);
      const success = !(buildLogObject instanceof Error);
      const buildLog = buildLogObject.stderr + buildLogObject.stdout;
      const duration = Date.now() - new Date(dateTime);
      const buildEnd = { buildId, duration, success, buildLog };
      await build.setBuildFinish(buildEnd);
      QuAPI.deleteLine(buildId);
    } catch (error) {
      throw error;
    }
  };

  runBuildFromQueue = async ({ buildId, buildCommand, repoName, commitHash }) => {
    try {
      const settings = { repoName, buildCommand };
      await this.dirPreparation(commitHash, settings);
      await this.building(buildId, settings);
    } catch (error) {
      throw error;
    }
  };

  checkQueueAndRun = async () => {
    const data = await readFile('./storage/queue.txt', 'utf8');
    try {
      for (let current of data.split('\n').filter(item => !!item)) {
        current = JSON.parse(current);
        await this.runBuildFromQueue(current);
      }
      console.log('restart queue');
      setTimeout(this.checkQueueAndRun, 10000);
    } catch (error) {
      console.log('checkQueueAndRun: ', error);
    }
  };
}