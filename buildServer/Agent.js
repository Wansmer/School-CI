const axios = require('axios');
const axiosAgent = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
})

exports.Agent = class {

  constructor (props) {
     this.host = props.host;
     this.port = props.port;
     this.isFree = props.isFree || true;
     this.currentBuild = '';
     this.axios = axiosAgent;
  }

  changeIsFree (id = '') {
    this.isFree = !this.isFree;
    this.currentBuild = id;
  }

  getUrl = () => {
    return `http://${this.host}:${this.port}`
  }

  sendBuild = async (build) => {
    try {
      await this.axios.post(`${this.getUrl()}/build`, { build });
      return { status: 'OK' };
    } catch (error) {
      return error;
    }
  }

}
