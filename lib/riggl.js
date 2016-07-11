'use strict';


// Deps
const Bloomrun = require('bloomrun');
const HttpTransporter = require('./transporters/http');
const Boom = require('boom');
const EventEmitter = require('events');




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

	}




	log(tags, data) {
		this._logger(`[ ${tags.join(', ')} ]`, Date.now(), ':', data);
	}




	add(sig, handler) {

		let payload = function(args) {

			return new Promise((resolve, reject) => {
				resolve(handler(args));
			});

		}

		this._bloomrun.add(sig, payload);
		return this;
	}





	act(sig) {
		return new Promise(function(resolve, reject) {

			let actor = this._bloomrun.lookup(sig);

			if(!actor) {
				return reject( Boom.notFound('Unknown signature') );
			}

			resolve( actor(sig) );

		}.bind(this));
	}





	client(options) {

		let transporter = this._transporters[options.type];

		let payload = function(args) {
			return new Promise((resolve) => {
				resolve( transporter.request(args, options) );
			});
		};


		if(Array.isArray(options.pin)) {
			options.pin.forEach(function(sig) {
				this._bloomrun.add(sig, payload);
			}.bind(this))
		} else {
			this._bloomrun.add(options.pin, payload);
		}

		return this;

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
