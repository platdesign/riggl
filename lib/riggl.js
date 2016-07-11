'use strict';

const Bloomrun = require('bloomrun');



class Riggl {

	constructor(options) {

		this._bloomrun = Bloomrun({
			indexing: 'depth'
		});

		this._transporters = {};

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
			resolve(this._bloomrun.lookup(sig)(sig));
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

}


module.exports = function(options) {
	return new Riggl(options);
}
