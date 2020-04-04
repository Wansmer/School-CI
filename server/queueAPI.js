const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const writeFile = util.promisify(fs.writeFile);

exports.queueAPI = class {

  constructor(fileName) {
    this.fileName = fileName;
  }

  addLine = async (commitHash, buildInfo, settings) => {
    const { id, status } = buildInfo;
    const { repoName, buildCommand } = settings;
    const line = `{"commitHash": "${commitHash}","buildId": "${id}","status": "${status}", "repoName": "${repoName}", "buildCommand": "${buildCommand}"}`;
    // await appendFile(this.fileName, `${line}\n`);
    fs.appendFileSync(this.fileName, `${line}\n`);
  }

  setStatus = async (buildId, status) => {
    // const file = await readFile(this.fileName, 'utf8');
    console.log(buildId);
    const file = fs.readFileSync(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem)
                        .map((elem) => JSON.parse(elem))
                        .map((elem) => elem.buildId === buildId ? (elem.status = status, elem) : elem)
                        .map((elem) => JSON.stringify(elem))
                        .join('\n');
    console.log(storage);
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  deleteLine = async (buildId) => {
    // const file = await readFile(this.fileName, 'utf8');
    const file = fs.readFileSync(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
                        .join('\n');
    console.log('AFTER DELETE: ', storage);
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  cleanFile () {
    fs.writeFileSync(this.fileName, ``);
  }

}
