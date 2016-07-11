'use strict';

const Riggl = require('../../../');
const MathPlugin = require('../../unit/lib/math-plugin');

const server = Riggl({
//	logger: () => {}
});

server.use( MathPlugin );

server.listen({
	type: 'http',
	port: 5555
});

