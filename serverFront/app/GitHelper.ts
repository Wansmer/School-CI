import util from 'util';
const exec = util.promisify(require('child_process').exec);

export class GitHelper {

  private gitPath: string;
  private exec: any;

  constructor (gitPath: string) {
    this.gitPath = gitPath;
    this.exec = exec;
  }

  public cloneRepo = async (data: ConfigurationModel): Promise<CodeSuccess> => {
    try {
      await this.exec(`git clone ${this.gitPath}${data.repoName} clone/${data.repoName}`);
      return { code: 200 };
    } catch (error) {
      return error;
    }
  };

  public pullRepo = async (data: ConfigurationModel): Promise<CodeSuccess> => {
    const settings = { cwd: `./clone/${data.repoName}` };
    try {
      await this.exec(`git checkout ${data.mainBranch} && git pull`, settings);
      return { code: 200 };
    } catch (error) {
      return error;
    }
  };

  public getCommitInfo = async (commitHash: string, data: ConfigurationModel): Promise<CommitInfo> => {
    const settings = { cwd: `./clone/${data.repoName}`};
    try {
      const result = await this.exec(`git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D`, settings);
      let [ authorName, commitMessage, branchName ] = result.stdout.split(':::');
      branchName = this.getBranchName(branchName);
      return { authorName, commitMessage, commitHash, branchName };
    } catch (error) {
      throw error;
    }
  };

  private getBranchName = (data: string): string => {
    const arrBranch = data.split(', ');
    const last = arrBranch.length - 1;
    const branch = arrBranch[last].replace('origin/', '') || 'master';
    return branch === 'HEAD' ? 'master' : branch.trim();
  };
}
