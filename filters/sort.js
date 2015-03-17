module.exports = function(comparisonFunction) {
	return function(list) {
		return list.sort(comparisonFunction);
	};
};
