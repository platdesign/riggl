'use strict';


module.exports = function createUnitTransporter() {

	const servers = {};

	function UnitTransporter(riggl, options) {

		this.request = function(args, serverOptions) {

			return servers[serverOptions.port](args)
				.then((res) => {
					return JSON.parse(res);
				})
				.then((res) => {
					return res.response;
				});
		};

		this.listen = function(options) {
			servers[options.port] = function requestHandler(args) {

				return riggl.act(args)
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
		};

	}

	UnitTransporter.attributes = { name: 'unit' };

	return UnitTransporter;

};
