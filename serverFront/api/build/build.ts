import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL, headers } from '../../constants';

export class Build {

  private axios: AxiosInstance;

  constructor() {
    this.axios = axios;
  }

  public getBuildList = async (offset: number = 0, limit: number = 25): Promise<BuildModel> => {
    const params = {
      offset,
      limit
    };
    try {
      const response: AxiosResponse = await this.axios.get(BASE_URL + 'build/list', { headers, params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  public setBuildRequest = async (data: BuildInfo): Promise<BuildModel> => {
    try {
      const response: AxiosResponse = await this.axios.post(BASE_URL + 'build/request', data, { headers });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  public getBuildLog = async (buildId: string): Promise<AxiosResponse> => {
    const params = { buildId };
    try {
      const response: AxiosResponse = await this.axios.get(BASE_URL + 'build/log', { headers, params });
      return response;
    } catch (error) {
      throw error;
    }
  };

  public getBuildDetails = async (buildId: string): Promise<BuildModel> => {
    const params = { buildId };
    try {
      const response: AxiosResponse = await this.axios.get(BASE_URL + 'build/details', { headers, params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  public setBuildStart = async (data: StartBuildInput): Promise<number> => {
    try {
      const response: AxiosResponse = await this.axios.post(BASE_URL + 'build/start', data, { headers });
      return response.status;
    } catch (error) {
      throw error;
    }
  };

  public setBuildFinish = async (data: FinishBuildInput): Promise<number> => {
    try {
      const response: AxiosResponse = await this.axios.post(BASE_URL + 'build/finish', data, { headers });
      return response.status;
    } catch (error) {
      throw error;
    }
  };

  public setBuildCancel = async (data: CancelBuildInput): Promise<number>  => {
    try {
      const response: AxiosResponse = await this.axios.post(BASE_URL + 'build/cancel', data, { headers });
      return response.status;
    } catch (error) {
      return error;
    }
  };

}
