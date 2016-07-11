'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const which = require('which');
const Riggl = require( process.cwd() );

const Code = require('code');
const expect = Code.expect;



describe('e2e:', () => {

	describe('math', () => {

		let serverProcess;
		let client;

		beforeEach((done) => {

			const serverPath = path.join(__dirname, 'e2e', 'lib', 'start-server-as-child-process.js');
			const cmd = which.sync('node');

			serverProcess = spawn(cmd, [serverPath], {
				cwd: path.resolve(serverPath, '..')
			});

			serverProcess.stdout.on('data', (payload) => {
				//console.log(payload.toString());
			});

			serverProcess.stderr.on('data', (payload) => {
				//console.log(payload.toString());
			});


			client = Riggl();

			client.client({
				type: 'http',
				port: 5555,
				pin: [
					{ service: 'math' }
				]
			});

			client.ready(done);

		});

		afterEach(() => {
			serverProcess.kill();
		});





		it('should execute cmd: add', () => {

			return client.act({
				service: 'math',
				cmd: 'add',
				first: 1,
				second: 2
			})
			.then((res) => {
				expect(res)
					.to.be.a.number()
					.and.equal(3);
			});

		});


		it('should execute cmd: sub', () => {

			return client.act({
				service: 'math',
				cmd: 'sub',
				first: 5,
				second: 2
			})
			.then((res) => {
				expect(res)
					.to.be.a.number()
					.and.equal(3);
			});

		});





		it('should act with error on unknown method', () => {

			return client.act({
				service: 'math',
				cmd: 'unknown'
			})
			.catch((err) => {

				expect(err)
					.to.be.an.error();

				expect(err.isBoom)
					.to.equal(true);

				expect(err.message)
					.to.be.a.string()
					.and.equal('Method not found');

			});


		});




	});

});
