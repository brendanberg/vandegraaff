module.exports = function(attr, value) {
    return function(data) {
		var computed = undefined;

		if (typeof(value) === 'function') {
			computed = value.call(this, data);
		} else {
			computed = value;
		}

		if (computed === undefined) {
			delete data[attr];
		} else {
			data[attr] = computed;
		}

        return data;
    };
};
