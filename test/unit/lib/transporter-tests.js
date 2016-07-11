'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );
const MathPlugin = require('./math-plugin');


module.exports = function(Transporter) {


	const type = Transporter.attributes.name;

	describe(`Transpoter: ${type}`, () => {

		let client;
		let server;

		beforeEach(() => {
			client = Riggl({
				logger: () => {}
			});
			server = Riggl({
				logger: () => {}
			});

			server.use( MathPlugin );

			server.transporter(Transporter);
			client.transporter(Transporter);

			server.listen({
				type: type,
				port: 5555
			});

			client.client({
				type: type,
				port: 5555,
				pin: [{ service: 'math' }]
			});
		});

		afterEach(() => {
			client.close();
			server.close();
		});






		it('should act with correct result', () => {

			return client.act({
				service: 'math',
				cmd: 'add',
				first: 3,
				second: 5
			})
			.then((res) => {
				expect(res)
					.to.be.a.number()
					.and.equal(8);
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

			});


		});





	});



}

