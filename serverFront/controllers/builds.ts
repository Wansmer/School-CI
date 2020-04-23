import { Build } from '../api/build/build';
import { Conf } from '../api/conf/conf';
import { GIT_PATH } from '../constants';
import { GitHelper } from '../app/GitHelper';

const gitHelper = new GitHelper(GIT_PATH);

const build = new Build();
const conf = new Conf();


export class BuildController {

    getBuildList: Function;
    getBuildLog: Function;
    getBuildDetails: Function;
    setBuildRequest: Function;
    getConf: Function;
    getCommitInfo: Function;

  constructor () {
    this.getBuildList = build.getBuildList;
    this.getBuildLog = build.getBuildLog;
    this.getBuildDetails = build.getBuildDetails;
    this.setBuildRequest = build.setBuildRequest;
    this.getConf = conf.getConf;
    this.getCommitInfo = gitHelper.getCommitInfo;
  }

  public fetchBuildsList = async (req: any, res: any): Promise<void> => {
    try {
      const response: BuildModel[] = await this.getBuildList();
      res.send(response);
    } catch (error) {
      res.send([]);
    }
  }

  public fetchBuildLog = async (req: any, res: any): Promise<void> => {
    const buildId = req.params.buildId;
    try {
      const response = await this.getBuildLog(buildId);
      let data = response.data;
      data = JSON.stringify(data);
      res.send(data);
    } catch (error) {
      res.send('');
    }
  }

  public fetchBuildDetails = async (req: any, res: any): Promise<void> => {
    const buildId = req.params.buildId;
    try {
      const response: BuildModel = await this.getBuildDetails(buildId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }

  public sendBuildRequest = async (req: any, res: any): Promise<void> => {
    const commitHash = req.params.commitHash;
    try {
      const settings: ConfigurationModel = await this.getConf();
      const commitInfo: CommitInfo = await this.getCommitInfo(commitHash, settings);
      const buildInfo: BuildInfo = await this.setBuildRequest(commitInfo);
      buildInfo.code = 200;
      res.send(buildInfo);
    } catch (error) {
      res.send(error);
    }
  }
}
