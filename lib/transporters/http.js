'use strict';

const request = require('request-promise');
const http = require('http');
const payload = require('request-payload');
const Boom = require('boom');


const DEFAULT_PORT = 9876;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_SCHEME = 'http';



module.exports = function HTTPTransporter(riggl, options) {


	this.listen = function(options) {
		const server = http.createServer(function(req, res) {

			payload(req, (body) => {

				riggl.act(JSON.parse(body))
				.then((response) => {
					res.end(JSON.stringify({
						response: response
					}));
				}, (err) => {
					res.end(
						JSON.stringify(err)
					);
				});

			});
		});

		server.listen(options.port || DEFAULT_PORT, function() {
			//console.log('listening');
		})

		riggl._closeHandlers.push(() => {
			server.close();
		});
	};







	this.request = function(args, serverOptions) {

		return request({
			method: 'POST',
			url: `${serverOptions.scheme||DEFAULT_SCHEME}://${serverOptions.host||DEFAULT_HOST}:${serverOptions.port||DEFAULT_PORT}`,
			json: args
		})
		.then((res) => {

			if(res.error) {
				throw res.error;
			}

			return res.response;

		});

	};


};

module.exports.attributes = {
	name: 'http'
};
