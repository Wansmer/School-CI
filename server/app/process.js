const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { GIT_PATH } = require('../constants');
const { queueAPI } = require('../queueAPI');
const conf = require('../api/conf/conf');
const build = require('../api/build/build');

const QuAPI = new queueAPI('../storage/queue.txt');

exports.cloneRepo = async (data) => {
  try {
    const { stdout, stderr } = await exec(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    return { stdout, stderr };
  } catch (error) {
    throw error;
  }
};

exports.pullRepo = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`git pull ${GIT_USER}${data.repoName} clone/${data.repoName}`, settings);
    return true;
  } catch (error) {
    return error;
  }
};

exports.installPackage = async (data) => {
  console.log('Start instal package inside func....');

  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`npm i`, settings);
    console.log('End install package inside func....')
    return true;
  } catch (error) {
    console.log('Error install package inside func....')
    return error;
  }
};

exports.getCommitInfo = async (commitHash, data) => {
  try {
    const result = await exec(`git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D`, { cwd: `./clone/${data.repoName}`});
    let [ authorName, commitMessage, branchName ] = result.stdout.split(':::');
    branchName = branchName.split(', ')[branchName.split(', ').length - 1] || 'master';
    return { authorName, commitMessage, commitHash, branchName };
  } catch (error) {
    return error;
  }
}

exports.goToCommit = async (commitHash, data) => {
  console.log('Start go to commit inside func....');
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const {stdout, stderr} = await exec(`git checkout master && git checkout ${commitHash}`, settings);
    console.log('End go to commit inside func....', stderr);
    return {stdout, stderr};
  } catch (error) {
    console.log('Error go to commit inside func....', error);
    return error;
  }
}

exports.startBuild = async (data) => {
  console.log('Start build inside func....');
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const command = data.buildCommand;
    console.log('Command: ', command);
    const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
    console.log('End build inside func....');
    console.log('Stdout, Stderr: ', command, stdout, stderr)
    return { stdout, stderr };
  } catch (error) {
    console.log('Error go to commit inside func....');
    return error;
  }
};

exports.clearNodeModules = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`rm -Rf node_modules`, settings)
    console.log('Delete all node modules...');
    return true;
  } catch (error) {
    console.log('Error of clear node modules: ', error);
    return error;
  }
}

exports.dirPreparation = async (commitHash, settings) => {
  await clearNodeModules(settings);
  await goToCommit(commitHash, settings);
  await installPackage(settings);
}

exports.builder = async (buildId, settings) => {
  QuAPI.setStatus(buildId, 'inProgress');
  const dateTime = new Date().toISOString();
  build.setBuildStart({ buildId, dateTime });
  const buildLogObject = await startBuild(settings);
  const success = !(buildLogObject instanceof Error);
  const buildLog = buildLogObject.stderr + buildLogObject.stdout;
  const duration = Date.now() - new Date(dateTime);
  const buildEnd = { buildId, duration, success, buildLog };
  build.setBuildFinish(buildEnd);
}

exports.runBuildFromQueue = async ({ buildId, buildCommand, repoName, commitHash }) => {
  const settings = { repoName, buildCommand };
  QuAPI.setStatus(buildId, 'inProgress');
  await dirPreparation(commitHash, settings);
  await builder(buildId, settings);
  QuAPI.deleteLine(JSON.parse(current).id);
}

exports.checkQueueAndRun = async () => {
  const data = await readFile('./storage/queue.txt', 'utf8');
  for (let current of data.split('\n').filter(item => !!item)) {
    current = JSON.parse(current); 
    await runBuildFromQueue(current);
  }
  console.log('restart check');
  setTimeout(checkQueueAndRun, 10000);
}

