const {describe, it} = require('mocha');
const {expect} = require('chai');
const {Build} = require('../../../../server/api/build/build');
const {BASE_URL} = require('../../../../server/constants');


describe('Работа с БД: Информация о сборках', () => {

  describe('Метод getBuildList', () => {
    const build = new Build();
    const data = {
      'data': {
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

    let result;

    build.axios = {
      get: (...args) => {
        result = args;
        return Promise.resolve(data);
      }
    }
    it('Принимает правильный URL', async () => {
      await build.getBuildList();
      expect(result[0]).to.equal(`${BASE_URL}build/list`);
    })
    it('Возвращает корректные данные', async () => {
      const res = await build.getBuildList();
      expect(res[0]).to.deep.equal(returnData[0]);
    })
    it('Возвращает массив', async () => {
      const res = await build.getBuildList();
      expect(res).to.be.an('array');
    })
  })
  describe('Метод setBuildRequest', () => {
    const build = new Build();

    const returnData = {
      data: {
        'data': {
          'id': '8cee3685-e1ac-4e12-8970-2d52164c392f',
          'buildNumber': 15,
          'status': 'Waiting'
        }
      }
    }
    let result;

    build.axios = {
      post: (...args) => {
        result = args;
        return Promise.resolve(returnData);
      }
    }
    it('Принимает правильный URL', async () => {
      await build.setBuildRequest({});
      expect(result[0]).to.equal(`${BASE_URL}build/request`);
    })
    it('Возвращает корректные данные', async () => {
      const res = await build.setBuildRequest({});
      expect(res).to.deep.equal(returnData.data.data);
    })
  })
  describe('Метод getBuildLog', () => {
    const build = new Build();

    const returnData = 'log';
    let result;

    build.axios = {
      get: (...args) => {
        result = args;
        return Promise.resolve(returnData);
      }
    }
    it('Принимает правильный URL', async () => {
      await build.getBuildLog({});
      expect(result[0]).to.equal(`${BASE_URL}build/log`);
    })
    it('Возвращает строку', async () => {
      const res = await build.getBuildLog({});
      expect(res).to.be.a('string');
    })
    it('Возвращает НЕ пустую строку', async () => {
      const res = await build.getBuildLog({});
      expect(res.lenght).to.not.equal(0);
    })
  })

  describe('Метод getBuildDetails', () => {
    const build = new Build();

    const returnData = {
      data: {
        'data': {
          'id': '8cee3685-e1ac-4e12-8970-2d52164c392f',
          'configurationId': 'e7bd6d4b-a290-47df-8937-450e1d5e266b',
          'buildNumber': 15,
          'commitMessage': 'string',
          'commitHash': 'string',
          'branchName': 'string',
          'authorName': 'string',
          'status': 'Waiting'
        }
      }
    };
    let result;

    build.axios = {
      get: (...args) => {
        result = args;
        return Promise.resolve(returnData);
      }
    }
    it('Принимает правильный URL', async () => {
      await build.getBuildDetails('buildId');
      expect(result[0]).to.equal(`${BASE_URL}build/details`);
    })
    it('Возвращает корректные данные', async () => {
      const res = await build.getBuildDetails('buildId');
      expect(res).to.deep.equal(returnData.data.data);
    })
  })
  describe('Метод setBuildStart', () => {
    const build = new Build();

    let result;

    build.axios = {
      post: (...args) => {
        result = args;
        return Promise.resolve({status: 200});
      }
    }
    it('Принимает правильный URL', async () => {
      await build.setBuildStart('buildId');
      expect(result[0]).to.equal(`${BASE_URL}build/start`);
    })
    it('Возвращает корректный статус', async () => {
      const res = await build.setBuildStart('buildId');
      expect(res).to.deep.equal(200);
    })
  })
  describe('Метод setBuildFinish', () => {
    const build = new Build();

    let result;

    build.axios = {
      post: (...args) => {
        result = args;
        return Promise.resolve({status: 200});
      }
    }
    it('Принимает правильный URL', async () => {
      await build.setBuildFinish('buildId');
      expect(result[0]).to.equal(`${BASE_URL}build/finish`);
    })
    it('Возвращает корректный статус', async () => {
      const res = await build.setBuildFinish('buildId');
      expect(res).to.deep.equal(200);
    })
  })
  describe('Метод setBuildCancel', () => {
    const build = new Build();

    let result;

    build.axios = {
      post: (...args) => {
        result = args;
        return Promise.resolve({status: 200});
      }
    }
    it('Принимает правильный URL', async () => {
      await build.setBuildCancel('buildId');
      expect(result[0]).to.equal(`${BASE_URL}build/cancel`);
    })
    it('Возвращает корректный статус', async () => {
      const res = await build.setBuildCancel('buildId');
      expect(res).to.deep.equal(200);
    })
  })
});