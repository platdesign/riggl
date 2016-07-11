'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );


describe('use(Plugin, options)', () => {

	let instance;
	before(() => {
		instance = Riggl();
	});




	it('should add new handler from plugin', () => {

		const Plugin = function(options) {

			expect(this).to.equal(instance);
			expect(options.test).to.equal(123);

			this.add({
				service: 'test',
				cmd: 'run'
			}, function() {
				return options.test;
			});

		};

		let res = instance.use(Plugin, { test:123 })

		expect(res).to.equal(instance)

		return instance.act({
			service: 'test',
			cmd: 'run'
		}).then((res) => {
			expect(res).to.be.a.number().and.equal(123);
		});

	});

});



