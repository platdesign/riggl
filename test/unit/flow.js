'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Riggl = require( CWD );
const createFlowTests = require('./lib/create-flow-tests');


describe('Without transporter', () => {

	const env = {};

	beforeEach(() => {
		env.server = env.client = Riggl();
	});

	createFlowTests(env);

});
