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
    // TODO: Непонятно, как тестировать процедуру, в которой просто
    //  последовательно вызываются другие процедуры, не возвращающие результаты
    // const builder = new Builder();
    //
    // const data = {repoName: 'Testing/testRepoName'};
    //
    // let argsExec = '';
    // let argsGoToCommit = '';
    //
    // builder.exec = (...args) => {
    //   argsExec = args;
    //   return Promise.resolve('');
    // }
    //
    // builder.goToCommit = (...args) => {
    //   argsGoToCommit = args;
    //   return Promise.resolve('');
    // }
    //
    // it('Дочерный процесс принимает корректную команду', async () => {
    //   await builder.dirPreparation(data);
    //   expect(argsExec[0].trim()).to.equal('rm -Rf node_modules');
    // });
    //
    // it(`Комманда выполняется в правильной директории`, async () => {
    //   await builder.dirPreparation(data);
    //   expect(argsGoToCommit[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    // });
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
    //.
  });

  describe('Метод runBuildFromQueue', () => {
    //.
  });

  describe('Метод checkQueueAndRun', () => {
    // .
  });
});