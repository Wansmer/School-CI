const {describe, it} = require('mocha');
const { expect } = require('chai');

const { GitHelper } = require('../../../serverFront/app/GitHelper');
const GIT_PATH = 'https://github.com/'

describe('Модуль GitHelper', () => {
  describe('Метод cloneRepo', () => {
    const gitHelper = new GitHelper(GIT_PATH);
    let result = '';
    gitHelper.exec = (...args) => {
      result = args;
      return Promise.resolve('')
    };
    const data = {repoName: 'Testing/testRepoName'};
    it(`В дочерний процесс передается корректная команда (git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}): `, async () => {
      await gitHelper.cloneRepo(data)
      // пробелы не влияют на выполнение команды - убрал ложную ошибку
      expect(result[0].trim()).to.equal(`git clone ${GIT_PATH}${data.repoName} clone/${data.repoName}`);
    })

    it(`Возвращается объект, имеющий поле code.`, async () => {
      const res = await gitHelper.cloneRepo(data);
      expect(res).to.have.property('code');
    })
  })

  describe('Метод pullRepo', () => {
    const gitHelper = new GitHelper(GIT_PATH);
    let result = '';
    gitHelper.exec = (...args) => {
      result = args;
      return Promise.resolve('')
    };
    const data = {branchName: 'master', repoName: 'Testing/testRepoName'};
    it(`В дочерний процесс передается корректная команда (git checkout ${data.branchName} && git pull): `, async () => {
      await gitHelper.pullRepo(data);
      expect(result[0].trim()).to.equal(`git checkout ${data.branchName} && git pull`);
    })

    it(`Комманда выполняется в правильной директории`, async () => {
      await gitHelper.pullRepo(data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    })

    it(`Возвращается объект, имеющий поле code.`, async () => {
      const res = await gitHelper.pullRepo(data);
      expect(res).to.have.property('code');
    })
  })

  describe('Метод getCommitInfo', () => {
    const gitHelper = new GitHelper(GIT_PATH);
    let result = '';
    gitHelper.exec = (...args) => {
      result = args;
      return Promise.resolve({stdout: 'Testing:::my message of commit:::master'
    })
    };
    const commitHash = '1234567';
    const response = { authorName: 'Testing', commitMessage: 'my message of' +
        ' commit', commitHash, branchName: 'master' }
    const data = {branchName: 'master', repoName: 'Testing/testRepoName'};
    it(`В дочерний процесс передается корректная команда (git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D): `, async () => {
      await gitHelper.getCommitInfo(commitHash, data);
      expect(result[0].trim()).to.equal(`git log ${commitHash} -n 1 --pretty=format:%an:::%s:::%D`);
    })

    it(`Комманда выполняется в правильной директории`, async () => {
      await gitHelper.getCommitInfo(commitHash, data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    })

    it(`Возвращается объект, имеющий ожидаемые поля (authorName, commitMessage, commitHash, branchName)`, async () => {
      const res = await gitHelper.getCommitInfo(commitHash, data);
      expect(res).to.deep.equal(response);
    })
  })
  describe('Метод goToCommit', () => {
    const gitHelper = new GitHelper(GIT_PATH);
    let result = '';
    gitHelper.exec = (...args) => {
      result = args;
      return Promise.resolve({stdout: '', stderr: ''});
    };
    const commitHash = '1234567';
    const data = {branchName: 'master', repoName: 'Testing/testRepoName'};
    it(`В дочерний процесс передается корректная команда (git checkout ${commitHash} .): `, async () => {
      await gitHelper.goToCommit(commitHash, data);
      expect(result[0].trim()).to.equal(`git checkout ${commitHash} .`);
    })

    it(`Комманда выполняется в правильной директории`, async () => {
      await gitHelper.goToCommit(commitHash, data);
      expect(result[1]).to.deep.equal({ cwd: `./clone/${data.repoName}` });
    })

  })

  describe('Метод getBranchName', () => {
    const gitHelper = new GitHelper(GIT_PATH);
    const str = 'HEAD, origin/my_branch';
    it(`Возвращает форматированное значение после последней запятой в строке ('HEAD, origin/my_branch' => 'my_branch')`, () => {
      const res = gitHelper.getBranchName(str);
      expect(res).to.equal('my_branch');
    })

    it(`Возвращается строка без пробелов`, () => {
      const res = gitHelper.getBranchName(str);
      expect(res).to.not.include(' ');
    })
  })
});