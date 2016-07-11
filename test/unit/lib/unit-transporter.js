'use strict';

const path = require('path');
const TransporterBase = require(path.join( process.cwd(), 'lib', 'transporters', 'base'));

module.exports = function createUnitTransporter() {

	const servers = {};



	class UnitTransporter extends TransporterBase {

		request(args, serverOptions) {
			return servers[serverOptions.port](args)
				.then((res) => {
					return JSON.parse(res);
				})
				.then((res) => {
					return res.response;
				});
		};



		listen(options) {
			const that = this;


			servers[options.port] = function requestHandler(args) {

				return that.riggl.act(args)
					.then((res) => {
						return JSON.stringify({
							response: res
						});
					}, (err) => {
						return JSON.stringify({
							error: err
						});
					});

			};

			this.log(['info'], 'Listening');

			this.on('close', function() {
				that.log(['closed']);
			});

		};

	}



	UnitTransporter.attributes = { name: 'unit' };

	return UnitTransporter;

};
