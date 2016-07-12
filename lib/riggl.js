'use strict';


// Deps
const Bloomrun = require('bloomrun');
const HttpTransporter = require('./transporters/http');
const Boom = require('boom');
const EventEmitter = require('events');
const utils = require('./utils');



class Riggl extends EventEmitter {

	constructor(options) {

		options = options || {};

		super();

		this._logger = options.logger || console.log;

		this._bloomrun = Bloomrun({
			indexing: 'depth'
		});

		this._transporters = {};

		this.transporter( HttpTransporter );

		this._readyPromises = [];

		this.add({
			riggl: true,
			cmd: 'ping'
		}, () => {
			return 'pong';
		});

	}




	log(tags, data) {
		this._logger(`[ ${tags.join(', ')} ]`, Date.now(), ':', data);
	}




	add(sig, handler) {

		if(sig === null || typeof sig !== 'object') {
			throw new Error('Invalid signature');
		}

		if(!handler || !utils.isFunction(handler)) {
			throw new Error('Invalid handler');
		}

		this._bloomrun.add(sig, function(args) {
			return new Promise((resolve, reject) => {
				resolve(handler(args));
			});
		});

		return this;
	}





	act(sig) {
		return new Promise(function(resolve, reject) {

			let actor = this._bloomrun.lookup(sig);

			if(!actor) {
				return reject( Boom.notFound('Method not found') );
			}

			resolve(actor(sig));

		}.bind(this));
	}





	client(options) {

		let transporter = this._transporters[options.type];

		let payload = function(args) {
			return utils.resolveValueObject(options)
				.then((options) => {
					return transporter.request(args, options);
				});
		};


		if(Array.isArray(options.pin)) {
			options.pin.forEach(function(sig) {
				this._bloomrun.add(sig, payload);
			}.bind(this))
		} else {
			this._bloomrun.add(options.pin, payload);
		}


		let isReady = function() {
			return payload({
				riggl: true,
				cmd: 'ping'
			})
			.then((res) => {
				return true;
			}, (err) => {
				return new Promise((resolve) => {
					setTimeout(()=>{
						resolve(isReady());
					}, 500);
				})
			});
		};


		this._readyPromises.push( isReady() );

		return this;
	}




	ready(handler) {
		Promise.all(this._readyPromises)
		.then(() => {
			handler();
		});
	}


	listen(options) {
		this._transporters[options.type].listen(options);
		return this;
	}





	use(plugin, options) {
		plugin.bind(this)(options);
		return this;
	}




	table() {
		return this._bloomrun.list();
	}





	transporter(Trans, options) {
		let name = Trans.attributes.name;
		this._transporters[name] = new Trans(this, options);
		return this;
	}





	close() {
		this.emit('close');
	}

}


module.exports = function(options) {
	return new Riggl(options);
}





