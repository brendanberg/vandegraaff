module.exports = function(property, value) {
	return function(data) {
		if (typeof(value) === 'function') {
			this[property] = value.call(this);
		} else {
			this[property] = value;
		}
		return data;
	};
};
