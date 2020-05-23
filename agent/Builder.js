const { GIT_PATH } = require('./constants');
const { GitHelper } = require('./GitHelper');
const gitHelper = new GitHelper(GIT_PATH);

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { getDurationFrom } = require('./utils');

exports.Builder = class {

  constructor () {
    this.exec = exec;
    this.goToCommit = gitHelper.goToCommit;
    this.setTimeout = global.setTimeout;
  }

  clearCloneDirectory = async () => {
    try {
      await this.exec('rm -Rf clone');
    } catch (error) {
      throw error;
    }
  };

  installPackage = async ({ repoName }) => {
    const settings = { cwd: `./clone/${ repoName }` };
    try {
      await this.exec('npm i', settings);
    } catch (error) {
      throw error;
    }
  };

  startBuild = async ({ repoName, buildCommand }) => {
    const settings = { cwd: `./clone/${repoName}` };
    try {
      const { stdout, stderr } = await this.exec(`${buildCommand}`, settings);
      return { stdout, stderr };
    } catch (error) {
      return error;
    }
  };

  building = async ({ id, repoName, buildCommand, commitHash, dateTime }) => {
    try {
      const commit =  this.goToCommit({ commitHash, repoName });
      await commit;

      const installPackage = this.installPackage({ repoName });
      await installPackage;

      const buildLogObject = await this.startBuild({ repoName, buildCommand });

      const success = !(buildLogObject instanceof Error);
      const buildLog = buildLogObject.stderr + buildLogObject.stdout;
      const duration = getDurationFrom(dateTime);

      return { buildId: id, duration, success, buildLog };
    } catch (error) {
      throw error;
    }
  };
}
