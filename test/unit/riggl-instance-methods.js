'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );


describe('riggl instance methods', () => {

	let instance;
	before(() => {
		instance = Riggl();
	});

	shouldHaveMethod('add');
	shouldHaveMethod('act');
	shouldHaveMethod('use');
	shouldHaveMethod('client');
	shouldHaveMethod('listen');
	shouldHaveMethod('table');


	function shouldHaveMethod(name) {
		it(`should have method: ${name}()`, () => {
			expect(instance[name]).to.be.a.function();
		});
	}

});



