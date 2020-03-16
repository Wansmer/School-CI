const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { GIT_PATH } = require('../constants');

exports.cloneRepo = async (data) => {
  try {
    await exec(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    return true;
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
    throw error;
  }
};

exports.installPackage = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`npm i`, settings);
    return true;
  } catch (error) {
    throw error;
  }
};

exports.goToCommit = async (commitHash, data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`git checkout ${commitHash}`, settings);
    console.log('go to commit ------- OK');
    return true;
  } catch (error) {
    throw error;
  }
}

exports.startBuild = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
    console.log('start build ------- OK');
    return stdout;
  } catch (error) {
    throw error;
  }
};
