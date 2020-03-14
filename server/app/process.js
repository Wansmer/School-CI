const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const { GIT_USER } = require('../constants');

exports.cloneRepo = async (data) => {
  try {
    await exec(`git clone ${GIT_USER}${data.repoName} clone/${data.repoName}_${data.mainBranch}`);
    return true;
  } catch (error) {
    return error;
  }
};

exports.installPackage = async (data) => {
  console.log(data);
  const settings = {
    cwd: `./clone/${data.repoName}_${data.mainBranch}`,
  };
  await exec(`npm i`, settings);
};

exports.startBuild = async (data) => {
  exec(`cd clone/testOfBuild && ${cmd}`, (error, stdout, stderr) => {
    fs.writeFile('log.txt', stdout, (e) => console.log(e));
  });
};

exports.updateRepo = async () => {
  //
};
