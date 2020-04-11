// const util = require('util');
// const fs = require('fs');
// const exec = util.promisify(require('child_process').exec);
// const readFile = util.promisify(fs.readFile);
// const { queueAPI } = require('../queueAPI');
// const { Build } = require('../api/build/build');
// const build = new Build();
//
// const { GIT_PATH } = require('../constants');
// const { GitHelper } = require('../app/GitHelper');
//
// const gitHelper = new GitHelper(GIT_PATH);
//
// const QuAPI = new queueAPI('./storage/queue.txt');
//
// const installPackage = async (data) => {
//   const settings = { cwd: `./clone/${data.repoName}` };
//   try {
//     await exec('npm i', settings);
//   } catch (error) {
//     throw error;
//   }
// };
//
// const startBuild = async (data) => {
//   const settings = { cwd: `./clone/${data.repoName}` };
//   try {
//     const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
//     return { stdout, stderr };
//   } catch (error) {
//     return error;
//   }
// };
//
// const clearNodeModules = async (data) => {
//   const settings = { cwd: `./clone/${data.repoName}` };
//   try {
//     await exec('rm -Rf node_modules', settings);
//   } catch (error) {
//     throw error;
//   }
// };
//
// const dirPreparation = async (commitHash, settings) => {
//   try {
//     await clearNodeModules(settings);
//     await gitHelper.goToCommit(commitHash, settings);
//     await installPackage(settings);
//   } catch (error) {
//     console.log('ERROR FROM DIR_PREPARATION: ', error);
//     throw error;
//   }
// };
//
// const builder = async (buildId, settings) => {
//   try {
//     QuAPI.setStatus(buildId, 'inProgress');
//     const dateTime = new Date().toISOString();
//     await build.setBuildStart({ buildId, dateTime });
//     const buildLogObject = await startBuild(settings);
//     console.log('startBuild done');
//     const success = !(buildLogObject instanceof Error);
//     const buildLog = buildLogObject.stderr + buildLogObject.stdout;
//     const duration = Date.now() - new Date(dateTime);
//     const buildEnd = { buildId, duration, success, buildLog };
//     QuAPI.deleteLine(buildId);
//     const finishRes = await build.setBuildFinish(buildEnd);
//     console.log('build.setBuildFinish done', finishRes);
//   } catch (error) {
//     throw error;
//   }
// };
//
// const runBuildFromQueue = async ({ buildId, buildCommand, repoName, commitHash }) => {
//   try {
//     const settings = { repoName, buildCommand };
//     await dirPreparation(commitHash, settings);
//     console.log('dirPreparation done...');
//     await builder(buildId, settings);
//     console.log('builder done...');
//   } catch (error) {
//     throw error;
//   }
// };
//
// exports.checkQueueAndRun = async () => {
//   const data = await readFile('./storage/queue.txt', 'utf8');
//   try {
//     for (let current of data.split('\n').filter(item => !!item)) {
//       current = JSON.parse(current);
//       await runBuildFromQueue(current);
//     }
//     console.log('restart queue');
//     setTimeout(this.checkQueueAndRun, 10000);
//   } catch (error) {
//     console.log('checkQueueAndRun: ', error);
//   }
// };
