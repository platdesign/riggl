'use strict';

const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');


const createTransporterTests = require('./lib/create-transporter-tests');
const createUnitTransporter = require('./lib/unit-transporter');


createTransporterTests(
	createUnitTransporter()
);


createTransporterTests(
	require(
		path.join(CWD, 'lib', 'transporters', 'http')
	)
);

