'use strict';

const EventEmitter = require('events');


module.exports = class TransporterBase extends EventEmitter{

	constructor(riggl, options) {
		super();

		const that = this;
		this.riggl = riggl;

		this.riggl.on('close', () => {
			that.emit('close');
		});

		this.initialize(options);
	}

	initialize(options) {

	}

	log(tags, data) {
		tags.push(this.constructor.attributes.name);
		return this.riggl.log(tags, data);
	}

}
