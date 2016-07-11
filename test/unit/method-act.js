'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );


describe('riggl.act([sig])', () => {

	let instance;
	beforeEach(() => {
		instance = Riggl();
	});




	it('should return a promise', () => {
		expect(instance.act({})).to.be.an.object().and.to.be.instanceof(Promise);
	});




	it('should act', () => {

		instance.add({
			service: 'test',
			cmd: 'run'
		}, function(args) {
			return 123;
		});

		return instance.act({
			service: 'test',
			cmd: 'run'
		}).then((res) => {
			expect(res).to.be.a.number().and.equal(123);
		});

	});






});



