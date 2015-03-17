module.exports = function () {
	var args = Array.prototype.slice.call(arguments);

	// TODO: This is not quite the same as pipeline() due to the initial value
	// (`it`) provided to the reduce function.
	return function(items) {
		return items.map(function(it) {
			return args.reduce(function(previous, current) {
				if (current.name === 'join') {
					return [previous];
				} else if (previous && previous.map) {
					return previous.map(function(p) { return current(p) });
				} else {
					return current(previous);
				}
			}, it);
		});
	};
};
