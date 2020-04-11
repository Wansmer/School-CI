const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.GitHelper = class {
  constructor (gitPath) {
    this.gitPath = gitPath;
  }

  cloneRepo = async (data) => {
    try {
      await exec(`git clone ${this.gitPath}${data.repoName} clone/${data.repoName}`);
      return { code: 200 };
    } catch (error) {
      return error;
    }
  };

  pullRepo = async (data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await exec(`git checkout ${data.branchName} && git pull`, settings);
      return true;
    } catch (error) {
      throw error;
    }
  };

  getCommitInfo = async (commitHash, data) => {
    try {
      console.log('get result START');
      const result = await exec(`git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D`, { cwd: `./clone/${data.repoName}`});
      console.log('get result DONE', result);
      let [ authorName, commitMessage, branchName ] = result.stdout.split(':::');
      branchName = this.getBranchName(branchName);
      return { authorName, commitMessage, commitHash, branchName };
    } catch (error) {
      throw error;
    }
  };

  getBranchName = (data) => {
    const arrBranch = data.split(', ');
    const last = arrBranch.length - 1;
    const branch = data.split(', ')[last].replace('origin/', '') || 'master';
    return branch === 'HEAD' ? 'master' : branch;
  };

  goToCommit = async (commitHash, data) => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      const {stdout, stderr} = await exec(`git checkout ${commitHash} .`, settings);
      return {stdout, stderr};
    } catch (error) {
      throw error;
    }
  };

}