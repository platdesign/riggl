'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const Riggl = require( CWD );
const createUnitTransporter = require('./lib/unit-transporter');




describe('riggl.transporter([Transporter], [Options])', () => {

	let instance;
	beforeEach(() => {
		instance = Riggl();
	});

	it('should register transporter', () => {

		const Transporter = function(riggl, options) {

			expect(riggl).to.equal(instance);
			expect(options).to.equal({});

			this.listen = function() {

			};

			this.request = function() {

			};

		};

		Transporter.attributes = { name: 'testTransporter' };


		let res = instance.transporter(Transporter, {})

		expect(res).to.equal(instance);
		expect(instance._transporters)
			.to.be.an.object()
			.and.have.length(1);

	});







	describe('with second instance', () => {

		let instanceB;
		beforeEach(() => {
			instanceB = Riggl();
		});



		it('should act over transporter', () => {

			const Transporter = createUnitTransporter();

			instance.transporter(Transporter);
			instanceB.transporter(Transporter);

			instanceB
				.add({
					service: 'test',
					cmd: 'log'
				}, (args) => {
					return args.value;
				})
				.listen({
					type: 'unit',
					port: 1234
				});


			instance.client({
				type: 'unit',
				port: 1234,
				pin: [{
					service: 'test',
				}]
			});


			return instance.act({
				service: 'test',
				cmd: 'log',
				value: 123
			})
			.then((res) => {
				expect(res).to.equal(123);
			});



		});


	});





});



