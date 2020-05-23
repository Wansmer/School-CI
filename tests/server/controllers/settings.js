const {describe, it} = require('mocha');
const { expect } = require('chai');
const { ConfController } = require('../../../serverFront/controllers/settings');

const settingsController = new ConfController();

describe('Контроллер по работе с настройками', () => {
  const settingsData = {
    id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
    repoName: "Wansmer/testOfBuild",
    buildCommand: "npm run build",
    mainBranch: "master",
    period: 10
  };

  settingsController.cloneRepo = () => {
    return Promise.resolve({code: 200});
  }
  settingsController.getConf = () => {
    return Promise.resolve(settingsData);
  };
  settingsController.setConf = () => {
    return Promise.resolve({ code: 200 });
  };
  settingsController.deleteConf = () => {
    return Promise.resolve({ code: 200 });
  };

  const req = {
    body: {
      "repoName": "Wansmer/testOfBuild",
      "buildCommand": "npm run build",
      "mainBranch": "master",
      "period": 10
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

  describe('Метод getSettings', () => {
    it('Получение настроек с сервера', async () => {
      await settingsController.getSettings(req, res);
      expect(res.data).to.deep.equal(settingsData);
    });
  });

  describe('Метод setSettings', () => {
    it('Отправка настроек на сервер и клонирование репозитория', async () => {
      await settingsController.setSettings(req, res);
      expect(res.data).to.deep.equal({code: 200});
    });
  });

  describe('Метод deleteSettings', () => {
    it('Удаление настроек на сервере', async () => {
      await settingsController.deleteSettings(req, res);
      expect(res.status).to.deep.equal(200);
    });
  });
});