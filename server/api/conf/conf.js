const axios = require('axios');
const BASE_URL = 'https://hw.shri.yandex/api/';
const MYAPIKEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ2OTc3MTczIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IldhbnNtZXIiLCJ1cm46Z2l0aHViOnVybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvV2Fuc21lciIsIm5iZiI6MTU4NDA5NTYzNCwiZXhwIjoxNTg2Njg3NjM0LCJpc3MiOiJTaHJpLUhvbWV3b3JrIiwiYXVkIjoiU2hyaS1Ib21ld29yayJ9.1YC9weT9bdj2Alx4ehYVIOPOq67cIj2Sd28g3jqNz2k';
const headers = {
  accept: 'application/json',
  Authorization: MYAPIKEY
}
exports.getConf = async () => {
  try {
    const response = await axios.get(BASE_URL + 'conf', { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

exports.setConf = async (data) => {
  try {
    data.period = +data.period;
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log('error');
  }
}

exports.deleteConf = async () => {
  try {
    const response = await axios.delete(BASE_URL + 'conf', { headers });
  } catch (error) {
    console.log('error');
  }
}
