const { API } = require('./api');
const api = new API();

exports.Queue = class {
  constructor () {
    this.data = [];
  }

  add = (data) => {
    this.data.push(...data);
  }

  size = () => {
    return this.data.filter(item => item.status === 'Waiting').length;
  }

  update = async () => {
    try {
      // TODO: прописать рекурсию, если полученная очередь больше 35 шт.
      const builds = await api.getBuildList();
      this.add(builds.filter(item => item.status === 'Waiting').reverse());
      return true;
    } catch (error) {
      console.error('API fail', error.message);
      return false;
    }
  }

  next = () => {
    return this.data.filter(item => item.status === 'Waiting')[0];
  }

  last = () => {
    return this.data.filter(item => item.status === 'Waiting')[this.size() - 1];
  }

  delete =  (buildId) => {
    const deleted = this.data.findIndex(item => item.id === buildId);
    this.data.splice(deleted, 1);
  }

  setStatus = (buildId, status) => {
    const build = this.data.find(item => item.id === buildId);
    build.status = status;
  }

  getData = () => {
    return this.data;
  }

}