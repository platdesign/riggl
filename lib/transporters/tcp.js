'use strict';

const request = require('request-promise');
const http = require('http');
const payload = require('request-payload');
const Boom = require('boom');
const BaseTransporter = require('./base');

const DEFAULT_PORT = 9876;
const DEFAULT_HOST = '127.0.0.1';


class TcpTransporter extends BaseTransporter {

	initialize(options) {

	}

	listen(options) {

	}

	request(args, serverOptions) {

	}

}

TcpTransporter.attributes = {
	name: 'tcp'
};

module.exports = TcpTransporter;
