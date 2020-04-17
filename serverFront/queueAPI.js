const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

exports.queueAPI = class {

  constructor(fileName) {
    this.fileName = fileName;
    this.readFile = readFile;
  }

  addToQueue = (commitHash, buildInfo, settings) => {
    const { id, status } = buildInfo;
    const { repoName, buildCommand } = settings;
    const line = `{"commitHash": "${commitHash}","buildId": "${id}","status": "${status}", "repoName": "${repoName}", "buildCommand": "${buildCommand}"}`;
    console.log('СМЕНА СТАТУСА СБОРКИ В ОЧЕРЕДИ');
    fs.appendFileSync(this.fileName, `${line}\n`);
  }

  setStatus = (buildId, status) => {
    const file = fs.readFileSync(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem)
                        .map((elem) => JSON.parse(elem))
                        .map((elem) => elem.buildId === buildId ? (elem.status = status, elem) : elem)
                        .map((elem) => JSON.stringify(elem))
                        .join('\n');
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  deleteFromQueue = (buildId) => {
    const file = fs.readFileSync(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
                        .join('\n');
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  getQueue = async () => {
    const data = await this.readFile(this.fileName, 'utf8');
    return data.split('\n').filter(item => !!item);
  }

  clearQueue () {
    fs.writeFileSync(this.fileName, ``);
  }

}
