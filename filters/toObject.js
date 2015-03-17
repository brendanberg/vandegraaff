module.exports = function(key, inObj) {
  return function(data) {
    var obj = {};
	
	if (inObj && typeof(inObj) === 'object') {
		for (var p in inObj) {
			obj[p] = inObj[p];
		}
	}

    if (key !== undefined) {
        obj[key] = data;
    }

    return obj;
  }
};
