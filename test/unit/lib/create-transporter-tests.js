'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );

const createFlowTests = require('./create-flow-tests');

module.exports = function(Transporter) {


	const type = Transporter.attributes.name;

	describe(`Transpoter: ${type}`, () => {

		const env = {};



		beforeEach(() => {

			env.client = Riggl({
				logger: () => {}
			});

			env.server = Riggl({
				logger: () => {}
			});

			env.server.transporter(Transporter);
			env.client.transporter(Transporter);

			env.server.listen({
				type: type,
				port: 5555
			});

			env.client.client({
				type: type,
				port: 5555,
				timeout: 200,
				pin: [{ service: 'math' }]
			});

		});

		afterEach(() => {
			env.client.close();
			env.server.close();
		});


		createFlowTests(env);



		it('should act with error on timeout', function() {

			env.server.add({
				service: 'math',
				cmd: 'timeout'
			}, () => {
				return new Promise((resolve) => {
					setTimeout(function() {
						resolve(123);
					}, 2000);
				});
			});


			return env.client.act({
				service: 'math',
				cmd: 'timeout'
			})
			.catch((err) => {

				expect(err)
					.to.be.an.error();

				expect(err.isBoom)
					.to.be.a.boolean()
					.and.equal(true);

				expect(err.message)
					.to.be.a.string()
					.and.equal('Timeout');

			});

		});



	});



}


