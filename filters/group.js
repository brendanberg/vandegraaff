/* Breaks a list of objects into groups such that all groups have a value for
   a specified key in common
 */

module.exports = function(key) {
	return function(list) {
		var groups = [];
		var result = [];
		for (var i in list) {
			var k = list[i][key];
			var idx = groups.indexOf(k);
			if (idx > -1) {
				result[idx]['values'].push(list[i]);
			} else {
				groups.push(k);
				result.push({key: k, values: [list[i]]});
			}
		}
		return result;
	};
};
