const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile);
const { GIT_PATH } = require('../constants');
const { queueAPI } = require('../queueAPI');
const { Build } = require('../api/build/build');
const build = new Build();

const QuAPI = new queueAPI('./storage/queue.txt');

exports.cloneRepo = async (data) => {
  try {
    const { stdout, stderr } = await exec(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    return { stdout, stderr };
  } catch (error) {
    console.log('Ошибка в cloneRepo.');
    throw error;
  }
};

exports.pullRepo = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`git checkout ${data.branchName} && git pull`, settings);
    return true;
  } catch (error) {
    console.log('Ошибка в pullRepo.');
    throw error;
  }
};

const installPackage = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec('npm i', settings);
  } catch (error) {
    console.log('Ошибка в installPackage.');
    throw error;
  }
};

exports.getCommitInfo = async (commitHash, data) => {
  try {
    const result = await exec(`git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D`, { cwd: `./clone/${data.repoName}`});
    let [ authorName, commitMessage, branchName ] = result.stdout.split(':::');
    branchName = getBranchName(branchName);
    return { authorName, commitMessage, commitHash, branchName };
  } catch (error) {
    console.log('Ошибка в getCommitInfo.');
    throw error;
  }
};

const getBranchName = (data) => {
  const arrBranch = data.split(', ');
  const last = arrBranch.length - 1;
  const branch = data.split(', ')[last].replace('origin/', '') || 'master';
  return branch === 'HEAD' ? 'master' : branch;
};

const goToCommit = async (commitHash, data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const {stdout, stderr} = await exec(`git checkout ${commitHash} .`, settings);
    return {stdout, stderr};
  } catch (error) {
    console.log('Ошибка в goToCommit.');
    throw error;
  }
};

const startBuild = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
    return { stdout, stderr };
  } catch (error) {
    console.log('Ошибка в startBuild.');
    return error;
  }
};

const clearNodeModules = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec('rm -Rf node_modules', settings);
  } catch (error) {
    console.log('Ошибка в clearNodeModules.');
    throw error;
  }
};

const dirPreparation = async (commitHash, settings) => {
  try {
    await clearNodeModules(settings);
    await goToCommit(commitHash, settings);
    await installPackage(settings);
  } catch (error) {
    console.log('Ошибка в dirPreparation.');
    throw error;
  }
};

const builder = async (buildId, settings) => {
  try {
    QuAPI.setStatus(buildId, 'inProgress');
    const dateTime = new Date().toISOString();
    await build.setBuildStart({ buildId, dateTime });
    const buildLogObject = await startBuild(settings);
    const success = !(buildLogObject instanceof Error);
    const buildLog = buildLogObject.stderr + buildLogObject.stdout;
    const duration = Date.now() - new Date(dateTime);
    const buildEnd = { buildId, duration, success, buildLog };
    QuAPI.deleteLine(buildId);
    await build.setBuildFinish(buildEnd);
  } catch (error) {
    console.log('Ошибка в билдер.');
    throw error;
  }
};

const runBuildFromQueue = async ({ buildId, buildCommand, repoName, commitHash }) => {
  try {
    const settings = { repoName, buildCommand };
    await dirPreparation(commitHash, settings);
    console.log('dirPreparation done...');
    await builder(buildId, settings);
    console.log('builder done...');
  } catch (error) {
    console.log('Ошибка в runBuildFromQueue.');
    throw error;
  }
};

exports.checkQueueAndRun = async () => {
  const data = await readFile('./storage/queue.txt', 'utf8');
  try {
    for (let current of data.split('\n').filter(item => !!item)) {
      current = JSON.parse(current);
      await runBuildFromQueue(current);
    }
    console.log('restart queue');
    setTimeout(this.checkQueueAndRun, 10000);
  } catch (error) {
    console.log('checkQueueAndRun: ', error);
  }
};
