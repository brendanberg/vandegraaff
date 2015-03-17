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
            if (mapping[i] !== null) {
                obj[i] = data[mapping[i]];
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
