'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );

describe('act(signature)', () => {

	const env = {};

	beforeEach(() => {
		env.server = env.client = Riggl();
	});


	it('should return a promise', () => {

		expect(env.client.act({}))
			.to.be.an.object()
			.and.to.be.instanceof(Promise);

	});


	it('should throw error on unknown signature', () => {

		return env.client.act({
			service: 'test',
			cmd: 'run'
		})
		.catch((err) => {

			expect(err)
				.to.be.an.error();

			expect(err.isBoom)
				.to.be.a.boolean()
				.and.equal(true);

		});

	});


});



