const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cp = require('child_process');
const { GIT_PATH } = require('../constants');

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
