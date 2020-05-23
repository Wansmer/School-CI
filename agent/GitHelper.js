const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.GitHelper = class {
  constructor (gitPath) {
    this.gitPath = gitPath;
    this.exec = exec;
  }

  cloneRepo = async (data) => {
    try {
      await this.exec(`git clone ${ this.gitPath }${ data.repoName } clone/${ data.repoName }`);
      return { code: 200 };
    } catch (error) {
      return error;
    }
  };

  goToCommit = async ({ commitHash, repoName }) => {
    const settings = { cwd: `./clone/${ repoName }` };
    try {
      await this.exec(`git checkout ${ commitHash } .`, settings);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

}
