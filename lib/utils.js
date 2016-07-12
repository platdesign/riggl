'use strict';


const utils = module.exports = {};



utils.isFunction = function(fn) {
	var getType = {};
		return fn && getType.toString.call(fn) === '[object Function]';
};


utils.resolveValueObject = function(options) {

	let _options = Object.keys(options)
		.map((key) => {
			let opt = options[key];

			if(utils.isFunction(opt)) {
				return function(acc) {

					acc.promises.push(
						Promise.resolve()
						.then(() => {
							return opt();
						})
						.then((res) => {
							acc.results[key] = res;
						})
					)

				};

			} else {
				return function(acc) {
					acc.results[key] = opt;
				};
			}
		})
		.reduce((acc, fn) => {
			fn(acc);
			return acc;
		}, {promises:[], results:{}})


	return Promise.all(_options.promises)
		.then(() => {
			return _options.results;
		});

};
