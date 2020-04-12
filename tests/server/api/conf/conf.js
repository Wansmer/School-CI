const {describe, it} = require('mocha');
const {expect} = require('chai');
const { Conf } = require('../../../../server/api/conf/conf');
const { BASE_URL } = require('../../../../server/constants');

describe('Работа с БД: Модуль настроек', () => {

	describe('Метод getConf', () => {
		const conf = new Conf();

		const data = {
			data: {
				data: {
					id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
					repoName: "Wansmer/testOfBuild",
					buildCommand: "npm run build",
					mainBranch: "master",
					period: 10
				}
			}
		}
		const returnData = {
			id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		const sendData = {
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		let result;

		conf.axios = {
			get: (...args) => {
				result = args;
				return Promise.resolve(data);
			},
			post: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			},
			delete: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			}
		}
		it('Принимает правильный URL', async () => {
			await conf.getConf();
			expect(result[0]).to.equal(`${BASE_URL}conf`);
		})
		it('Возвращает корректные данные', async () => {
			const res = await conf.getConf();
			expect(res).to.deep.equal(returnData);
		})
	});

	describe('Метод setConf', () => {
		const conf = new Conf();

		const data = {
			data: {
				data: {
					id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
					repoName: "Wansmer/testOfBuild",
					buildCommand: "npm run build",
					mainBranch: "master",
					period: 10
				}
			}
		}
		const returnData = {
			id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		const sendData = {
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		let result;

		conf.axios = {
			get: (...args) => {
				result = args;
				return Promise.resolve(data);
			},
			post: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			},
			delete: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			}
		}
		it('Принимает правильный URL', async () => {
			await conf.setConf(sendData);
			expect(result[0]).to.equal(`${BASE_URL}conf`);
		})
		it('Возвращает корректные данные', async () => {
			const res = await conf.setConf(sendData);
			expect(res).to.equal(200);
		})
	});

	describe('Метод deleteConf', () => {
		const conf = new Conf();

		const data = {
			data: {
				data: {
					id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
					repoName: "Wansmer/testOfBuild",
					buildCommand: "npm run build",
					mainBranch: "master",
					period: 10
				}
			}
		}
		const returnData = {
			id: "e7bd6d4b-a290-47df-8937-450e1d5e266b",
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		const sendData = {
			repoName: "Wansmer/testOfBuild",
			buildCommand: "npm run build",
			mainBranch: "master",
			period: 10
		}

		let result;

		conf.axios = {
			get: (...args) => {
				result = args;
				return Promise.resolve(data);
			},
			post: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			},
			delete: (...args) => {
				result = args;
				return Promise.resolve({ status: 200 });
			}
		}
		it('Принимает правильный URL', async () => {
			await conf.deleteConf();
			expect(result[0]).to.equal(`${BASE_URL}conf`);
		})
		it('Возвращает корректные данные', async () => {
			const res = await conf.deleteConf();
			expect(res).to.equal(200);
		})
	});
});
