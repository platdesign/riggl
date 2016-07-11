'use strict';


module.exports = function HTTPTransporter(riggl, options) {


	$http = function(config) {

	};



	this.listen = function(options) {

	};


	this.request = function(args, serverOptions) {
		return $http({
			method: 'POST',
			url: 'http://${serverOptions.host||127.0.0.1}:${serverOptions.port||9876}',
			data: args
		})
		.then((res) => {
			return res.response;
		}, (err) => {
			throw new Error(err.message);
		});
	};


};

module.exports.attributes = {
	name: 'http'
};
