const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

exports.queueAPI = class {

  constructor(fileName) {
    this.fileName = fileName;
  }

  addLine(commitHash, buildInfo) {
    const { id, status } = buildInfo;
    const line = `{"commitHash": "${commitHash}","id": "${id}","status": "${status}"}`;
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
          if (JSON.parse(elem).id && JSON.parse(elem).id === buildId) {
            const newElem = JSON.parse(elem);
            newElem.status = status;
            // console.log(newElem);
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
          .filter((elem) => !!elem && JSON.parse(elem).id !== buildId)
          .join('\n');
        return res;
        }).then((res) => {
          fs.writeFile(this.fileName, `${res}`, (err) => { if (err) console.log(err) });
        })
  }

  cleanFile () {
    fs.writeFile(this.fileName, `\n`, (err) => { if (err) console.log(err) });
  }

}
