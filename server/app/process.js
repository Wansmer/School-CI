const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { GIT_PATH } = require('../constants');

exports.cloneRepo = async (data) => {
  try {
    await exec(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    return true;
  } catch (error) {
    return error;
  }
};

exports.pullRepo = async (data) => {
  const settings = {
    // cwd: `./clone/testOfBuild`,
    cwd: `./clone/${data.repoName}`,
  };
  try {
    await exec(`git pul ${GIT_USER}${data.repoName} clone/${data.repoName}`);
    return true;
  } catch (error) {
    return error;
  }
};

exports.installPackage = async (data) => {
  const settings = { cwd: `./clone/${data.repoName}` };
  try {
    await exec(`npm i`, settings);
    return true;
  } catch (error) {
    return error;
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
  // exec(`cd clone/${data.repoName} && ${data.buildCommand}`, (error, stdout, stderr) => {
  //   fs.writeFile('log.txt', stdout, (e) => console.log(e));
  // });
};

exports.updateRepo = async () => {
  //
};
