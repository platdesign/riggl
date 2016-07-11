'use strict';

const Code = require('code');
const expect = Code.expect;

module.exports = function(env) {



	it('should act and resolve with number as value', () => {

		env.server.add({
			service: 'test',
			cmd: 'run'
		}, function(args) {
			return 123;
		});

		return env.client.act({
			service: 'test',
			cmd: 'run'
		})
		.then((res) => {

			expect(res)
				.to.be.a.number()
				.and.equal(123);

		});

	});



	it('should act and resolve with string as value', () => {

		env.server.add({
			service: 'test',
			cmd: 'run'
		}, function(args) {
			return '123';
		});

		return env.client.act({
			service: 'test',
			cmd: 'run'
		})
		.then((res) => {

			expect(res)
				.to.be.a.string()
				.and.equal('123');

		});

	});



	it('should act and resolve with array as value', () => {

		env.server.add({
			service: 'test',
			cmd: 'run'
		}, function(args) {
			return [1,2,3];
		});

		return env.client.act({
			service: 'test',
			cmd: 'run'
		})
		.then((res) => {

			expect(res)
				.to.be.an.array()
				.and.have.length(3);

		});

	});


	it('should act and resolve with object as value', () => {

		env.server.add({
			service: 'test',
			cmd: 'run'
		}, function(args) {
			return {
				a: 2,
				b: 'abc',
				c: null,
				d: true,
				e: false
			};
		});

		return env.client.act({
			service: 'test',
			cmd: 'run'
		})
		.then((res) => {

			expect(res)
				.to.be.an.object()
				.and.have.length(5);

			expect(res.a)
				.to.be.a.number()
				.and.equal(2);

			expect(res.b)
				.to.be.a.string()
				.and.equal('abc');

			expect(res.c)
				.to.be.null();

			expect(res.d)
				.to.be.a.boolean()
				.and.equal(true);

			expect(res.e)
				.to.be.a.boolean()
				.and.equal(false);

		});

	});




}
