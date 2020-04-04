const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

exports.queueAPI = class {

  constructor(fileName) {
    this.fileName = fileName;
  }

  addLine(commitHash, buildInfo, settings) {
    const { id, status } = buildInfo;
    const { repoName, buildCommand } = settings;
    const line = `{"commitHash": "${commitHash}","buildId": "${id}","status": "${status}", "repoName": "${repoName}", "buildCommand": "${buildCommand}"}`;
    fs.appendFile(this.fileName, `${line}\n`, (err) => {
      if (err) throw err;
    })
  }

  setStatus(buildId, status) {
    const array = readFile(this.fileName, 'utf8');
    array.then((res) => {
      res = res.split('\n')
        .filter((elem) => !!elem)
        .map((elem) => {
          if (JSON.parse(elem).buildId && JSON.parse(elem).buildId === buildId) {
            const newElem = JSON.parse(elem);
            newElem.status = status;
            elem = JSON.stringify(newElem);
          }
          return elem;
        })
        .join('\n');
      return res;
    }).then((res) => {
      fs.writeFile(this.fileName, `${res}\n`, (err) => { if (err) console.log(err) });
    })
  }

  deleteLine (buildId) {
    const array = readFile(this.fileName, 'utf8');
    array.then((res) => {
        res = res.split('\n')
          .filter((elem) => !!elem && JSON.parse(elem).buildId !== buildId)
          .join('\n');
        return res;
        }).then((res) => {
          fs.writeFile(this.fileName, `${res}\n`, (err) => { if (err) console.log(err) });
        })
  }

  cleanFile () {
    fs.writeFile(this.fileName, `\n`, (err) => { if (err) console.log(err) });
  }

}
