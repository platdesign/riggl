'use strict';

const request = require('request-promise');
const http = require('http');
const payload = require('request-payload');
const Boom = require('boom');
const BaseTransporter = require('./base');

const DEFAULT_PORT = 9876;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_SCHEME = 'http';


class HttpTransporter extends BaseTransporter {

	initialize(options) {
		this.type = 'http';
	}

	listen(options) {

		const that = this;

		const server = http.createServer(function(req, res) {

			payload(req, (body) => {

				that.riggl.act(JSON.parse(body))
				.then((response) => {
					res.end(JSON.stringify({
						response: response
					}));
				}, (err) => {
					if(err.isBoom) {
						res.statusCode = err.output.statusCode || 400;

						return res.end(
							JSON.stringify(err.output.payload)
						);
					} else {
						res.statusCode = 400;
						return res.end(
							JSON.stringify({
								statusCode: 400,
								error: 'Bad Request',
								message: err.message
							})
						);
					}
				});

			});

		});

		server.listen(options.port || DEFAULT_PORT, function() {
			that.log(['info', 'listen'], 'Listening');
		});

		this.on('close', () => {
			server.close();
			that.log(['info', 'closed'], 'Closed server connection');
		});

	}

	request(args, serverOptions) {
		return request({
			method: 'POST',
			url: `${serverOptions.scheme||DEFAULT_SCHEME}://${serverOptions.host||DEFAULT_HOST}:${serverOptions.port||DEFAULT_PORT}`,
			json: args
		})
		.then((res) => {
			return res.response;
		}, (err) => {
			throw Boom.create(err.response.statusCode, err.response.message);
		});
	}

}

HttpTransporter.attributes = {
	name: 'http'
};

module.exports = HttpTransporter;




