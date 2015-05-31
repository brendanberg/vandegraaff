module.exports = function(mapping, inObj) {
	return function(data) {
		var obj;

		if (inObj && typeof(inObj) === 'object') {
			obj = {};
			for (var p in inObj) {
				obj[p] = inObj[p];
			}
		} else {
			obj = data;
		}

		if (typeof(mapping) === 'object') {
			for (var i in mapping) {
				var value = mapping[i];

				if (value !== null) {
					if (typeof(value) === 'function') {
						var computed = value.call(ctx, data);

						if (typeof(computed) !== 'undefined') {
							obj[i] = computed;
						}
					} else {
						obj[i] = data[value];
					}
				}
			}

			for (var i in mapping) {
				if (mapping[i] === null) {
					delete obj[i];
				}
			}
		}

		return obj;
	}
};
