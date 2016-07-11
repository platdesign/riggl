'use strict';



module.exports = class TransporterBase {

	constructor(riggl, options) {
		this.riggl = riggl;
		this.initialize(options);
	}

	initialize(options) {

	}

	log(tags, data) {
		tags.push(this.type);
		this.riggl.log(tags, data);
	}

}
