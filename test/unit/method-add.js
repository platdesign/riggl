'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );


describe('riggl.add([sig], [handler])', () => {

	let instance;
	before(() => {
		instance = Riggl();
	});

	it('should add new handler', () => {

		let res = instance.add({
			service: 'test',
			cmd: 'run'
		}, function() {
			return true;
		});

		expect(res).to.equal(instance);


		let table = instance.table();

		expect(table).to.be.an.array().and.have.length(1);

	});

});



