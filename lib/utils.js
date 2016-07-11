'use strict';


const utils = module.exports = {};



utils.isFunction = function(fn) {
	var getType = {};
		return fn && getType.toString.call(fn) === '[object Function]';
};
