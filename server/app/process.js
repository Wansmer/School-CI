const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { GIT_USER } = require('../constants');

exports.cloneRepo = async (data) => {
  try {
    await exec(`git clone ${GIT_USER}${data.repoName} clone/${data.repoName}`);
    return true;
  } catch (error) {
    return error;
  }
};

exports.installPackage = async (data) => {
  const settings = {
    cwd: `./clone/testOfBuild`,
    // cwd: `./clone/${data.repoName}`,
  };
  try {
    await exec(`npm i`, settings);
    return true;
  } catch (error) {
    return error;
  }
};

exports.getCommitBranch = async (data) => {
  const settings = {
    cwd: `./clone/testOfBuild`,
    // cwd: `./clone/${data.repoName}`,
  };
  let branch = await exec(`git branch ${data.commitHash}`, settings);
  return branch;
};

exports.goToCommit = async (commitHash) => {
  const settings = {
    cwd: `./clone/testOfBuild`,
    // cwd: `./clone/${data.repoName}`,
  };
  let branch = await exec(`git checkout ${commitHash}`, settings);
  return true;
}

exports.startBuild = async (data) => {
  exec(`cd clone/testOfBuild && npm run build`, (error, stdout, stderr) => {
    fs.writeFile('log.txt', stdout, (e) => console.log(e));
  });
};

exports.updateRepo = async () => {
  //
};
