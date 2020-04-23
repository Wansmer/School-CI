import { Conf } from '../api/conf/conf';
import { GIT_PATH } from '../constants';
import { GitHelper } from '../app/GitHelper';

const conf = new Conf();
const gitHelper = new GitHelper(GIT_PATH);

export class ConfController {

  private getConf: Function;
  private setConf: Function;
  private deleteConf: Function;
  private cloneRepo: Function;

  constructor () {
    this.getConf = conf.getConf;
    this.setConf = conf.setConf;
    this.deleteConf = conf.deleteConf;
    this.cloneRepo = gitHelper.cloneRepo;
  }

  public getSettings = async (req: any, res: any): Promise<void> => {
    try {
      const response: ConfigurationModel = await this.getConf();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }

  public setSettings = async (req: any, res: any): Promise<void> => {
    const data = req.body;
    try {
      await this.setConf(data);
      const result: CodeSuccess = await this.cloneRepo(data);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }

  public deleteSettings = async (req: any, res: any): Promise<void> => {
    try {
      await this.deleteConf();
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  }
}
