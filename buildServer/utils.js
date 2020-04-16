const makeUrl = ({ host, port }) => {
  return `http://${ host }:${ port }`;
}

module.exports = { makeUrl };
