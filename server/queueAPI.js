const fs = require('fs');
const util = require('util');

exports.queueAPI = class {

  constructor(fileName) {
    this.fileName = fileName;
  }

  addLine = (commitHash, buildInfo, settings) => {
    const { id, status } = buildInfo;
    const { repoName, buildCommand } = settings;
    const line = `{"commitHash": "${commitHash}","buildId": "${id}","status": "${status}", "repoName": "${repoName}", "buildCommand": "${buildCommand}"}`;
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
    console.log('AFTER INSERT: ', storage);
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  deleteLine = (buildId) => {
    const file = fs.readFileSync(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
                        .join('\n');
    console.log('AFTER DELETE: ', storage);
    fs.writeFileSync(this.fileName, `${storage}`);
  }

  cleanFile () {
    fs.writeFileSync(this.fileName, ``);
  }

}
