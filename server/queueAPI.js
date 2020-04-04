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
    await appendFile(this.fileName, `${line}\n`);
  }

  setStatus = async (buildId, status) => {
    const file = await readFile(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem)
                        .map((elem) => JSON.parse(elem))
                        .map((elem) => elem.buildId === buildId ? (elem.status = status, elem) : elem)
                        .map((elem) => JSON.stringify(elem))
                        .join('\n');
    console.log('STORAGE: ', storage);
    // await writeFile(this.fileName, `${storage}\n`);
    fs.writeFileSync(this.fileName, `${storage}\n`);
  }

  deleteLine = async (buildId) => {
    const file = await readFile(this.fileName, 'utf8');
    const storage = file.split('\n')
                        .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
                        .join('\n');
    fs.writeFileSync(this.fileName, `${storage}\n`);
    // array.then((res) => {
    //     res = res.split('\n')
    //       .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
    //       .join('\n');
    //     return res;
    //     }).then((res) => {
    //       fs.writeFile(this.fileName, `${res}\n`, (err) => { if (err) console.log(err) });
    //     })
  }

  cleanFile () {
    fs.writeFile(this.fileName, ``, (err) => { if (err) console.log(err) });
  }

}
