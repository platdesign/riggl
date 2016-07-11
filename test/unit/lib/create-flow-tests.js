'use strict';

const Code = require('code');
const expect = Code.expect;

const MathPlugin = require('./math-plugin');


module.exports = function(env) {


	beforeEach(() => {
		env.server.use( MathPlugin );
	});



	it('should act with correct result', () => {

		return env.client.act({
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

		return env.client.act({
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




	it('should act with error on service not reachable', () => {

		env.server.close();

		return env.client.act({
			service: 'math',
			cmd: 'add',
			first: 3,
			second: 5
		})
		.catch((err) => {

			expect(err)
				.to.be.an.error();

			expect(err.isBoom)
				.to.equal(true);

			expect(err.message)
				.to.be.a.string()
				.and.equal('Connection refused');

		});


	});



}
