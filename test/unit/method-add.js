'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );



describe('add(signature, handler)', () => {

	let instance;
	beforeEach(() => {
		instance = Riggl();
	});


	it('should return self', () => {
		let res = instance.add({
			service: 'test',
			cmd: 'run'
		}, function() {
			return true;
		});

		expect(res)
			.to.equal(instance);

	});



	it('should add new handler', () => {

		let countBeforeAdd = instance.table().length;

		let res = instance.add({
			service: 'test',
			cmd: 'run'
		}, function() {
			return true;
		});


		let table = instance.table();

		expect(table)
			.to.be.an.array()
			.and.have.length( countBeforeAdd + 1 );

	});




	it('should throw error on invalid signature', () => {

		let error;

		try {
			instance.add('qwe', function() {
				return true;
			});
		} catch(e) {
			error = e;
		}

		expect(error)
			.to.be.an.error();

		expect(error.message)
			.to.be.a.string()
			.and.equal('Invalid signature');

	});





	it('should throw error on missing handler', () => {

		let error;

		try {
			instance.add({
				service: 'test'
			});
		} catch(e) {
			error = e;
		}

		expect(error)
			.to.be.an.error();

		expect(error.message)
			.to.be.a.string()
			.and.equal('Invalid handler');


	});



});



