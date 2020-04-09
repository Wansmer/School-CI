const {describe, it} = require('mocha');
const {expect} = require('chai');
const {Build} = require('../../../../server/api/build/build');
const {BASE_URL} = require('../../../../server/constants');


describe('Работа с БД: Модуль настроек', () => {
  const build = new Build();

  let result;

  build.axios = {
    get: (...args) => {
      result = args;
      return Promise.resolve(data);
    },
    post: (...args) => {
      result = args;
      return Promise.resolve({status: 200});
    },
    delete: (...args) => {
      result = args;
      return Promise.resolve({status: 200});
    }
  }

  describe('Метод getBuildList', () => {
    const data = {
      data: {
        'data': [
          {
            'id': '546129ed-e45e-45cd-a93a-4644a3d40695',
            'configurationId': 'e7bd6d4b-a290-47df-8937-450e1d5e266b',
            'buildNumber': 13,
            'commitMessage': 'add new logo',
            'commitHash': '013cee7',
            'branchName': 'master',
            'authorName': 'Wansmer',
            'status': 'InProgress',
            'start': '2020-04-09T05:19:34.2'
          }
        ]
      }
    }
    const returnData = [
      {
        'id': '546129ed-e45e-45cd-a93a-4644a3d40695',
        'configurationId': 'e7bd6d4b-a290-47df-8937-450e1d5e266b',
        'buildNumber': 13,
        'commitMessage': 'add new logo',
        'commitHash': '013cee7',
        'branchName': 'master',
        'authorName': 'Wansmer',
        'status': 'InProgress',
        'start': '2020-04-09T05:19:34.2'
      }
    ]

    build.axios.get = (...args) => {
      result = args;
      return Promise.resolve(data);
    }

    it('Принимает правильный URL', async () => {
      await build.getBuildList();
      expect(result[0]).to.equal(`${BASE_URL}build/list`);
    })
    it('Возвращает корректные данные', async () => {
      const res = await build.getBuildList();
      expect(res[0]).to.deep.equal(returnData[0]);
    })
  })
  //
  describe('Метод getBuildLog', () => {
    it('Принимает правильный URL', async () => {
      await build.getBuildLog(sendData);
      expect(result[0]).to.equal(`${BASE_URL}build/log`);
    })
    it('Возвращает корректные данные', async () => {
      const res = await build.getBuildLog(sendData);
      console.log(res);
      expect(res).to.equal(200);
    })
  })
  //
  // describe('Метод deleteConf', () => {
  // 	it('Принимает правильный URL', async () => {
  // 		await conf.deleteConf();
  // 		expect(result[0]).to.equal(`${BASE_URL}conf`);
  // 	})
  // 	it('Возвращает корректные данные', async () => {
  // 		const res = await conf.deleteConf();
  // 		console.log(res);
  // 		expect(res).to.equal(200);
  // 	})
  // })
});