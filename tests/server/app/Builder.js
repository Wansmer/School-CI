const {describe, it} = require('mocha');
const { expect } = require('chai');

const { Builder } = require('../../../server/app/Builder');

describe('Модуль Builder', () => {

  describe('Метод clearNodeModules', () => {
    const builder = new Builder();

    let result = '';

    builder.exec = (...args) => {
      result = args;
      return Promise.resolve('');
    }

    const data = {repoName: 'Testing/testRepoName'};

    it('Дочерный процесс принимает корректную команду', async () => {
      await builder.clearNodeModules(data);
      expect(result[0].trim()).to.equal('rm -Rf node_modules');
    });

    it(`Комманда выполняется в правильной директории`, async () => {
      await builder.clearNodeModules(data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    });
  });

  describe('Метод installPackage', () => {
    const builder = new Builder();

    let result = '';

    builder.exec = (...args) => {
      result = args;
      return Promise.resolve('');
    }

    const data = {repoName: 'Testing/testRepoName'};

    it('Дочерный процесс принимает корректную команду', async () => {
      await builder.installPackage(data);
      expect(result[0].trim()).to.equal('npm i');
    });

    it(`Комманда выполняется в правильной директории`, async () => {
      await builder.installPackage(data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    });
  });

  describe('Метод dirPreparation', () => {

    describe('В методе вызван метод clearNodeModules', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};
      builder.clearNodeModules = (...args) => {
        result = args;
        calledFuncs.push('clearNodeModules');
        return Promise.resolve('');
      };
      builder.goToCommit = () => Promise.resolve('');

      builder.installPackage = () => Promise.resolve('');

      it('clearNodeModules действительно вызван', async () => {
        await builder.dirPreparation('1234567', settings);
        expect(calledFuncs).to.include('clearNodeModules');
      });

      it(`Вызванный метод clearNodeModules принимает аргументом переданный объект настроек`, async () => {
        await builder.dirPreparation('1234567', settings);
        expect(result[0]).to.deep.equal(settings);
      });
    });

    describe('В методе вызван метод goToCommit', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};
      builder.clearNodeModules = () => Promise.resolve('');

      builder.goToCommit = (...args) => {
        result = args;
        calledFuncs.push('goToCommit');
        return Promise.resolve('');
      }

      builder.installPackage = () => Promise.resolve('');

      it('goToCommit действительно вызван', async () => {
        await builder.dirPreparation('1234567', settings);
        expect(calledFuncs).to.include('goToCommit');
      });

      it(`Вызванный метод goToCommit принимает первым аргументом переданный хэш коммита`, async () => {
        await builder.dirPreparation('1234567', settings);
        expect(result[0]).to.equal('1234567');
      });

      it(`Вызванный метод goToCommit принимает аргументом переданный объект настроек`, async () => {
        await builder.dirPreparation('1234567', settings);
        expect(result[1]).to.deep.equal(settings);
      });
    });

    describe('В методе вызван метод installPackage', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};
      builder.clearNodeModules = () => Promise.resolve('');
      builder.goToCommit = () => Promise.resolve('');

      builder.installPackage = (...args) => {
        result = args;
        calledFuncs.push('installPackage');
        return Promise.resolve('');
      }

      it('installPackage действительно вызван', async () => {
        await builder.dirPreparation('1234567', settings);
        expect(calledFuncs).to.include('installPackage');
      });

      it(`Вызванный метод installPackage принимает аргументом переданный объект настроек`, async () => {
        await builder.dirPreparation('1234567', settings);
        expect(result[0]).to.deep.equal(settings);
      });
    });
  });

  describe('Метод startBuild', () => {
    const builder = new Builder();

    let result = '';

    builder.exec = (...args) => {
      result = args;
      return Promise.resolve({ stdout: '', stderr: '' });
    }

    const data = {repoName: 'Testing/testRepoName', buildCommand: 'npm run' +
        ' listen'};

    it('Дочерный процесс принимает корректную команду', async () => {
      await builder.startBuild(data);
      expect(result[0].trim()).to.equal(`${data.buildCommand}`);
    });

    it(`Комманда выполняется в правильной директории`, async () => {
      await builder.startBuild(data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    });

    it(`Метод возвращает объект, с ожидаемыми полями ( stdout, stderr )`, async () => {
      const res = await builder.startBuild(data);
      expect(res).to.have.keys('stdout', 'stderr');
    });
  });

  describe('Метод building', () => {

    describe('В методе вызван метод setStatus', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      builder.setStatus = (...args) => {
        result = args;
        calledFuncs.push('setStatus');
        return Promise.resolve('');
      };

      const settings = {repoName: 'Testing/testRepoName'};

      builder.setBuildStart = () => Promise.resolve('');

      builder.startBuild = () => {
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.deleteFromQueue = () => Promise.resolve('');

      builder.setBuildFinish = () => Promise.resolve('');

      it('setStatus действительно вызван', async () => {
        await builder.building('1234567', settings);
        expect(calledFuncs).to.include('setStatus');
      });

      it(`Вызванный метод setStatus принимает аргументом id сборки`, async () => {
        await builder.building('1234567', settings);
        expect(result[0]).to.equal('1234567');
      });

      it(`Вызванный метод setStatus принимает аргументом статус в виде строки`, async () => {
        await builder.building('1234567', settings);
        expect(result[1]).to.a('string');
      });
    });

    describe('В методе вызван метод setBuildStart', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};

      builder.setStatus = () => Promise.resolve('');

      builder.setBuildStart = (...args) => {
        result = args;
        calledFuncs.push('setBuildStart');
        return Promise.resolve('');
      };

      builder.startBuild = () => {
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.deleteFromQueue = () => Promise.resolve('');

      builder.setBuildFinish = () => Promise.resolve('');

      it('setBuildStart действительно вызван', async () => {
        await builder.building('1234567', settings);
        expect(calledFuncs).to.include('setBuildStart');
      });

      it(`Вызванный метод setBuildStart принимает аргументом объект, содержащий поля (buildId, dateTime)`, async () => {
        await builder.building('1234567', settings);
        expect(result[0]).to.have.keys('buildId', 'dateTime' );
      });
    });

    describe('В методе вызван метод startBuild', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};

      builder.setStatus = () => Promise.resolve('');

      builder.setBuildStart = (...args) => Promise.resolve('');

      builder.startBuild = (...args) => {
        result = args;
        calledFuncs.push('startBuild');
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.deleteFromQueue = () => Promise.resolve('');

      builder.setBuildFinish = () => Promise.resolve('');

      it('startBuild действительно вызван', async () => {
        await builder.building('1234567', settings);
        expect(calledFuncs).to.include('startBuild');
      });

      it(`Вызванный метод startBuild принимает аргументом переданный объект настроек`, async () => {
        await builder.building('1234567', settings);
        expect(result[0]).to.deep.equal(settings );
      });
    });

    describe('В методе вызван метод deleteFromQueue', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};

      builder.setStatus = () => Promise.resolve('');

      builder.setBuildStart = () => Promise.resolve('');

      builder.startBuild = () => {
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.deleteFromQueue = (...args) => {
        result = args;
        calledFuncs.push('deleteFromQueue');
        return Promise.resolve('');
      };

      builder.setBuildFinish = () => Promise.resolve('');

      it('deleteFromQueue действительно вызван', async () => {
        await builder.building('1234567', settings);
        expect(calledFuncs).to.include('deleteFromQueue');
      });

      it(`Вызванный метод deleteFromQueue принимает аргументом переданный объект настроек`, async () => {
        await builder.building('1234567', settings);
        expect(result[0]).to.equal('1234567' );
      });
    });

    describe('В методе вызван метод setBuildFinish', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName'};

      builder.setStatus = () => Promise.resolve('');

      builder.setBuildStart = () => Promise.resolve('');

      builder.startBuild = () => {
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.deleteFromQueue = () => Promise.resolve('');

      builder.setBuildFinish = (...args) => {
        result = args;
        calledFuncs.push('setBuildFinish');
        return Promise.resolve('');
      };

      it('setBuildFinish действительно вызван', async () => {
        await builder.building('1234567', settings);
        expect(calledFuncs).to.include('setBuildFinish');
      });

      it(`Вызванный метод setBuildFinish принимает аргументом объект, содержащий поля (buildId, duration, success, buildLog)`, async () => {
        await builder.building('1234567', settings);
        expect(result[0]).to.have.keys('buildId', 'duration', 'success', 'buildLog');
      });
    });
  });

  describe('Метод runBuildFromQueue', () => {

    describe('В методе вызван метод dirPreparation', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName', buildId: '1234567', buildCommand: 'npm run build', commitHash: '7654321'};

      builder.dirPreparation = (...args) => {
        result = args;
        calledFuncs.push('dirPreparation');
        return Promise.resolve({ stderr: '', stdout: '' });
      };

      builder.building = () => Promise.resolve('');

      it('dirPreparation действительно вызван', async () => {
        await builder.runBuildFromQueue(settings);
        expect(calledFuncs).to.include('dirPreparation');
      });

      it(`Вызванный метод dirPreparation принимает первым аргументом хэш коммита`, async () => {
        await builder.runBuildFromQueue(settings);
        expect(result[0]).to.equal('7654321');
      });

      it(`Вызванный метод dirPreparation принимает вторым аргументом объект, содержащий поля (repoName, buildCommand)`, async () => {
        await builder.runBuildFromQueue(settings);
        expect(result[1]).to.have.keys('repoName', 'buildCommand');
      });
    });

    describe('В методе вызван метод building', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName', buildId: '1234567', buildCommand: 'npm run build', commitHash: '7654321'};

      builder.building = (...args) => {
        result = args;
        calledFuncs.push('building');
        return Promise.resolve('');
      };

      builder.dirPreparation = () => Promise.resolve('');

      it('building действительно вызван', async () => {
        await builder.runBuildFromQueue(settings);
        expect(calledFuncs).to.include('building');
      });

      it(`Вызванный метод building принимает первым аргументом ID сборки`, async () => {
        await builder.runBuildFromQueue(settings);
        expect(result[0]).to.equal('1234567');
      });

      it(`Вызванный метод building принимает вторым аргументом объект, содержащий поля (repoName, buildCommand)`, async () => {
        await builder.runBuildFromQueue(settings);
        expect(result[1]).to.have.keys('repoName', 'buildCommand');
      });
    });
  });

  describe('Метод checkQueueAndRun', () => {

    describe('В методе вызван метод getQueue', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName', buildId: '1234567', buildCommand: 'npm run build', commitHash: '7654321'};

      builder.getQueue = () => {
        calledFuncs.push('getQueue');
        return Promise.resolve(['{"commitHash": "1234567","buildId": "7654321","status": "Waiting", "repoName": "nameOfRepo", "buildCommand": "buildCommand"}']);
      };

      builder.runBuildFromQueue = () => Promise.resolve('');

      builder.setTimeout = () => {};

      it('getQueue действительно вызван', async () => {
        await builder.checkQueueAndRun(settings);
        expect(calledFuncs).to.include('getQueue');
      });
    });

    describe('В методе вызван метод runBuildFromQueue', () => {
      const builder = new Builder();
      let calledFuncs = [];
      let result = '';
      const settings = {repoName: 'Testing/testRepoName', buildId: '1234567', buildCommand: 'npm run build', commitHash: '7654321'};

      builder.runBuildFromQueue = (...args) => {
        result = args;
        calledFuncs.push('runBuildFromQueue');
        return Promise.resolve('');
      };

      builder.setTimeout = () => {};

      builder.getQueue = () => {
        return Promise.resolve(['{"commitHash": "1234567","buildId": "7654321","status": "Waiting", "repoName": "nameOfRepo", "buildCommand": "buildCommand"}']);
      };

      it('runBuildFromQueue действительно вызван', async () => {
        await builder.checkQueueAndRun();
        expect(calledFuncs).to.include('runBuildFromQueue');
      });

      it('runBuildFromQueue принимает объект очереди', async () => {
        await builder.checkQueueAndRun();
        expect(result[0]).to.have.keys("commitHash","buildId","status", "repoName", "buildCommand");
      });
    });
  });
});