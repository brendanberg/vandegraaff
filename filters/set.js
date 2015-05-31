module.exports = function(attr, value) {
    return function(data) {
		if (typeof(value) === 'function') {
			var computed = value.call(this, data);

			if (typeof(computed) !== 'undefined') {
				data[attr] = computed;
			}
		} else {
			data[attr] = value;
		}

        return data;
    };
};
