const {describe, it} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');
const {queueAPI} = require('../../server/queueAPI');

const fileName = './tests/server/storage/storage.txt';
const api = new queueAPI(fileName);

const isValidJSON = (string) => {
	try {
		JSON.parse(string);
		return true;
	} catch (err) {
		return false;
	}
}

describe('Работа с файлом очереди: ', () => {
	const commitHash = '1234567';
	const buildInfo = {
		id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
		buildNumber: 0,
		status: "Waiting"
	}
	const settings = {
		repoName: "test/repotest",
		buildCommand: "npm run build",
		mainBranch: "master",
		period: 0
	}
	const {id, status} = buildInfo;
	const {repoName, buildCommand} = settings;
	const line = `{"commitHash": "${commitHash}","buildId": "${id}","status": "${status}", "repoName": "${repoName}", "buildCommand": "${buildCommand}"}`;

	describe('Метод addLine', () => {
		const storageBefore = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem);

		api.addLine(commitHash, buildInfo, settings);

		const storageAfter = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem);

		it('Строка добавляется и добавляется только одна строка: ', function () {
			expect(storageBefore.length + 1).to.equal(storageAfter.length);
		});
		it('Строка файла - валидный json: ', function () {
			expect(isValidJSON(storageAfter[0])).to.be.true;
		});
		it('Значения записываются корректно: ', function () {
			const storage = storageAfter.map((elem) => JSON.parse(elem))[0];
			expect(storage).to.deep.equals(JSON.parse(line));
		});
		fs.writeFileSync(fileName, '', 'utf8');
	})
	describe('Метод setStatus', () => {
		const {id1, id2} = {id1: 1, id2: 2};
		buildInfo.id = id1;
		api.addLine(commitHash, buildInfo, settings);
		buildInfo.id = id2;
		api.addLine(commitHash, buildInfo, settings);
		const storageBefore = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem)
			.map((elem) => JSON.parse(elem));
		api.setStatus(id1, status);
		const storageAfter = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem)
			.map((elem) => JSON.parse(elem));
		it('Статус меняется на заданный: ', function () {
			expect(storageAfter[0].status).to.equal(status);
		});
		it('Остальные строки без изменений: ', function () {
			expect(storageAfter[1]).to.deep.equal(storageBefore[1]);
		});
		fs.writeFileSync(fileName, '', 'utf8');
	})
	describe('Метод deleteLine', () => {
		const {id1, id2} = {id1: '1', id2: '2'};
		buildInfo.id = id1;
		api.addLine(commitHash, buildInfo, settings);
		buildInfo.id = id2;
		api.addLine(commitHash, buildInfo, settings);
		const storageBefore = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem)
			.map((elem) => JSON.parse(elem));
		const deletedLine = storageBefore[0];
		api.deleteLine(id1);
		const storageAfter = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem)
			.map((elem) => JSON.parse(elem));

		it('Строка удалена: ', function () {
			expect(storageBefore.length - 1).to.equal(storageAfter.length);
		});
		it('Удалена нужная строка: ', function () {
			expect(storageAfter).to.not.have.members([deletedLine]);
		});
		it('Прочие строки не затронуты: ', function () {
			expect(storageAfter).to.deep.includes(storageBefore[1]);
		});
		fs.writeFileSync(fileName, '', 'utf8');
	});

	describe('Метод clearFile', () => {
		const {id1, id2} = {id1: '1', id2: '2'};
		buildInfo.id = id1;
		api.addLine(commitHash, buildInfo, settings);
		buildInfo.id = id2;
		api.addLine(commitHash, buildInfo, settings);
		const storageBefore = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem);
		api.cleanFile();
		const storageAfter = fs.readFileSync(fileName, 'utf8')
			.split('\n')
			.filter((elem) => !!elem);

		it(`Файл очищен: строк до ${storageBefore.length}, строк после ${storageAfter.length}`, function () {
			expect(storageAfter.length).to.equal(0);
		});
		fs.writeFileSync(fileName, '', 'utf8');
	})
});
