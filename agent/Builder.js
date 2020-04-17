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

  clearDirectory = async () => {
    const settings = { cwd: `./` };
    try {
      await this.exec('rm -Rf clone');
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
      const commit =  this.goToCommit({ commitHash, repoName });
      await commit;
      // установка пакетов
      const installPackage = this.installPackage({ repoName });
      await installPackage;
      // сборка
      const buildLogObject = await this.startBuild({ repoName, buildCommand });
      console.log('End of build');
      const success = !(buildLogObject instanceof Error);
      const buildLog = buildLogObject.stderr + buildLogObject.stdout;
      const duration = getDurationFrom(dateTime);
      const buildEnd = { buildId: id, duration, success, buildLog };
      console.log('End of clear directory');
      return buildEnd;
    } catch (error) {
      throw error;
    }
  };
}
