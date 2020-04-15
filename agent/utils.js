
const makeUrl = ({ host, port }) => {
  return `http://${host}:${port}`;
};

const getDurationFrom = (dateTime) => {
  return Date.now() - new Date(dateTime);
};

module.exports = { makeUrl, getDurationFrom };

