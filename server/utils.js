const util = require('util');
const cp = require('child_process');
const exec = util.promisify(cp.exec);

const makeUrl = ({ host, port }) => {
  return `http://${ host }:${ port }`;
};

const isPingSuccess = async ({ host, port }) => {
  try {
    await exec(`nc -zvw3 ${ host } ${ port }`);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { makeUrl, isPingSuccess };
