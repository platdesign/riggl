'use strict';



module.exports = function(options) {

	this.add({
		service: 'math',
		cmd: 'add'
	}, (args) => {
		return args.first + args.second;
	});

	this.add({
		service: 'math',
		cmd: 'sub'
	}, (args) => {
		return args.first - args.second;
	});


}
