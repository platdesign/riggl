'use strict';

const EventEmitter = require('events');


class TransporterBase extends EventEmitter{

	constructor(riggl, options) {
		super();

		this.riggl = riggl;

		this.riggl.on('close', function() {
			this.emit('close');
		}.bind(this));

		this.initialize(options);
	}

	initialize(options) {}

	log(tags, data) {
		tags.push(this.constructor.attributes.name);
		return this.riggl.log(tags, data);
	}

}

TransporterBase.attributes = {};


module.exports = TransporterBase;
