const {describe, it} = require('mocha');
const { expect } = require('chai');
const { BuildController } = require('../../../server/models/builds');

const buildController = new BuildController();

const settingsData = {
  id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
  repoName: "Wansmer/testOfBuild",
  buildCommand: "npm run build",
  mainBranch: "master",
  period: 10
};

const buildDetails = {
  'id': '8cee3685-e1ac-4e12-8970-2d52164c392f',
  'configurationId': 'e7bd6d4b-a290-47df-8937-450e1d5e266b',
  'buildNumber': 15,
  'commitMessage': 'string',
  'commitHash': 'string',
  'branchName': 'string',
  'authorName': 'string',
  'status': 'Waiting'
};

buildController.getBuildList = () => Promise.resolve([ 1, 3, 5 ]);
buildController.getBuildLog = () => Promise.resolve({data: 'log'});
buildController.getBuildDetails = () => Promise.resolve(buildDetails);
buildController.setBuildRequest = () => Promise.resolve({ code: 200 });
buildController.getConf = () => Promise.resolve(settingsData);
buildController.getCommitInfo = () => Promise.resolve({});
buildController.QuAPI = {
  addLine: () => ''
};

const req = {
  params: {
    buildId: '123',
    commitHash: '1234567'
  }
};

const res =  {
  data: {},
  status: '',
  send (value) {
    this.data = value
  },
  sendStatus (value) {
    this.status = value
  }
}

describe('Контроллер сборок', () => {
  describe('метод fetchBuildsList', () => {
    it('Получение массива сборок. Результат - массив.', async () => {
      await buildController.fetchBuildsList(req, res);
      expect(res.data).to.an('array');
    });
  });
  describe('метод fetchBuildLog', () => {
    it('Получение лога сборки. Результат - строка.', async () => {
      await buildController.fetchBuildLog(req, res);
      expect(res.data).to.an('string');
    });
    it('Получение лога сборки. Результат - не пустая строка.', async () => {
      await buildController.fetchBuildLog(req, res);
      expect(res.data.length).to.not.equal(0);
    });
  });
  describe('метод fetchBuildDetails', () => {
    it('Получение деталей сборки. Глубокое сравнение с примером.', async () => {
      await buildController.fetchBuildDetails(req, res);
      expect(res.data).to.deep.equal(buildDetails);
    });
  });
  describe('метод sendBuildRequest', () => {
    it('Отправка билда в очереддь. Возвращенный объект содержит свойсто code' +
      ' со значением 200', async () => {
      await buildController.sendBuildRequest(req, res);
      expect(res.data).to.have.property('code', 200);
    });
  });
});


