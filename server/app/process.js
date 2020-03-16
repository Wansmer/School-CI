const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { GIT_PATH } = require('../constants');

exports.cloneRepo = async (data) => {
  try {
    await exec(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

exports.pullRepo = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`git pull ${GIT_USER}${data.repoName} clone/${data.repoName}`, settings);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

exports.installPackage = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`npm i`, settings);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

exports.goToCommit = async (commitHash, data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`git checkout ${commitHash}`, settings);
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

exports.startBuild = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    const { stdout, stderr } = await exec(`${data.buildCommand}`, settings);
    return stdout;
  } catch (error) {
    throw new Error(error);
  }
};
