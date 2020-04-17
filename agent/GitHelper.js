const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.GitHelper = class {
  constructor (gitPath) {
    this.gitPath = gitPath;
    this.exec = exec;
  }

  cloneRepo = async (data) => {
    console.log('start clone repo');
    try {
      await this.exec(`git clone ${ this.gitPath }${ data.repoName } clone/${ data.repoName }`);
      return { code: 200 };
    } catch (error) {
      return error;
    }
  };

  getCommitInfo = async (commitHash, data) => {
    const settings = { cwd: `./clone/${ data.repoName }` };
    try {
      const result = await this.exec(`git log ${ commitHash } -n 1 --pretty=format:%an:::%s:::%D`, settings);
      let [authorName, commitMessage, branchName] = result.stdout.split(':::');
      branchName = this.getBranchName(branchName);
      return { authorName, commitMessage, commitHash, branchName };
    } catch (error) {
      throw error;
    }
  };

  getBranchName = (data) => {
    const arrBranch = data.split(', ');
    const last = arrBranch.length - 1;
    const branch = arrBranch[last].replace('origin/', '') || 'master';
    return branch === 'HEAD' ? 'master' : branch.trim();
  };

  goToCommit = async ({ commitHash, repoName }) => {
    console.log('start goToCommit');
    const settings = { cwd: `./clone/${ repoName }` };
    try {
      await this.exec(`git checkout ${ commitHash } .`, settings);
      return true;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

}
