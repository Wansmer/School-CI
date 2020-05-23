import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL, headers } from '../../constants';

export class Conf {

  private axios: AxiosInstance;

  constructor() {
    this.axios = axios;
  }

  public getConf = async (): Promise<ConfigurationModel> => {
    try {
      const response: AxiosResponse = await this.axios.get(BASE_URL + 'conf', { headers });
      return response.data.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public setConf = async (data: ConfigurationModel): Promise<number> => {
    try {
      data.period = +data.period;
      const response: AxiosResponse = await this.axios.post(BASE_URL + 'conf', data, { headers });
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }

  public deleteConf = async (): Promise<number> => {
    try {
      const response: AxiosResponse = await this.axios.delete(BASE_URL + 'conf', { headers });
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }
}
