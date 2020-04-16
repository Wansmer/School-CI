const { GitHelper } = require('./GitHelper');
const gitHelper = new GitHelper('https://github.com/');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { makeUrl, getDurationFrom } = require('./utils');

exports.Builder = class {
  constructor () {
    this.exec = exec;
    this.goToCommit = gitHelper.goToCommit;
    this.setTimeout = global.setTimeout;
  }

  clearNodeModules = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await this.exec('rm -Rf node_modules', settings);
    } catch (error) {
      throw error;
    }
  };

  clearDirectory = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await this.exec('rm -Rf node_modules', settings);
    } catch (error) {
      throw error;
    }
  };

  installPackage = async ({ repoName }) => {
    console.log('start installPackage', repoName);
    const settings = { cwd: `./clone/${ repoName }` };
    try {
      await this.exec('npm i', settings);
    } catch (error) {
      console.log('Ошибка в Install', error.message);
      throw error;
    }
  };

  startBuild = async ({ repoName, buildCommand }) => {
    console.log('start Build');
    const settings = { cwd: `./clone/${repoName}` };
    try {
      const { stdout, stderr } = await this.exec(`${buildCommand}`, settings);
      return { stdout, stderr };
    } catch (error) {
      return error;
    }
  };

  building = async ({ id, repoName, buildCommand, commitHash, dateTime }) => {
    console.log('start building func');
    try {
      // переход к коммиту
      await this.goToCommit({ commitHash, repoName });
      // установка пакетов
      await this.installPackage({ repoName });
      // сборка
      const buildLogObject = await this.startBuild({ repoName, buildCommand });

      const success = !(buildLogObject instanceof Error);
      const buildLog = buildLogObject.stderr + buildLogObject.stdout;
      const duration = getDurationFrom(dateTime);
      const buildEnd = { buildId: id, duration, success, buildLog };

      return buildEnd;
    } catch (error) {
      throw error;
    }
  };
}
