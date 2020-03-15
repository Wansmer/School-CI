const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');
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

exports.getCommitInfo = async (commitHash) => {
  const git = spawn('git', ['log', commitHash, '-n 1', '--pretty=format:{"autorName": "%an", "commitMessage": "%s"}'], { cwd: './clone/testOfBuild_master/'});
  git.stdout.on('data', (data) => {
    const res = Promise.resolve(JSON.parse(data));
    return res;
  });
  git.stderr.on('data', (data) => {
    return data;
  });
}

exports.startBuild = async (data) => {
  exec(`cd clone/testOfBuild && ${cmd}`, (error, stdout, stderr) => {
    fs.writeFile('log.txt', stdout, (e) => console.log(e));
  });
};

exports.updateRepo = async () => {
  //
};
