const axios = require('axios');
const BASE_URL = 'https://hw.shri.yandex/api/';
const MYAPIKEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ2OTc3MTczIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IldhbnNtZXIiLCJ1cm46Z2l0aHViOnVybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvV2Fuc21lciIsIm5iZiI6MTU4NDA5NTYzNCwiZXhwIjoxNTg2Njg3NjM0LCJpc3MiOiJTaHJpLUhvbWV3b3JrIiwiYXVkIjoiU2hyaS1Ib21ld29yayJ9.1YC9weT9bdj2Alx4ehYVIOPOq67cIj2Sd28g3jqNz2k';
const headers = {
  accept: 'application/json',
  Authorization: MYAPIKEY
}

exports.getBuildList = async (offset = 0, limit = 25) => {
  const params = {
    offset,
    limit
  };
  try {
    const response = await axios.get(BASE_URL + 'build/list', { headers, params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

exports.getBuildLog = async (buildId) => {
  try {
    const response = await axios.get(BASE_URL + 'conf', buildId, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildRequest = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildStart = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildFinish = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildCancel = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}
