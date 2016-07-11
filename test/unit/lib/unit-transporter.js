'use strict';

const path = require('path');
const TransporterBase = require(path.join( process.cwd(), 'lib', 'transporters', 'base'));
const Boom = require('boom');


module.exports = function createUnitTransporter() {

	const servers = {};



	class UnitTransporter extends TransporterBase {

		request(args, serverOptions) {

			let handler = servers[serverOptions.port];

			if(!handler) {
				return Promise.reject( Boom.badGateway('Connection refused') );
			}


			let result = handler(args);


			return new Promise((resolve, reject) => {
				let hasResult;

				let timeout = setTimeout(function() {
					if(!hasResult) {
						reject( Boom.serverUnavailable('Timeout') );
						hasResult = true;
					}
				}, serverOptions.timeout || 500);


				result.then((res) => {

					if(!hasResult) {
						resolve(res);
						clearTimeout(timeout);
						hasResult = true;
					}

				}, (err) => {

					if(!hasResult) {
						reject(err);
						hasResult = true;
						clearTimeout(timeout);
					}

				});

			});

		};



		listen(options) {
			const that = this;


			servers[options.port] = function requestHandler(args) {

				return that.riggl.act(args);

			};

			this.on('close', () => {
				delete servers[options.port]
			});

			this.log(['info'], 'Listening');

			this.on('close', function() {
				that.log(['closed']);
			});

		};

	}



	UnitTransporter.attributes = { name: 'unit' };

	return UnitTransporter;

};
