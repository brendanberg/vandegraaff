module.exports = function(attr, value) {
    return function(data) {
        data[attr] = (typeof(value) === 'function') ? value.call(null) : value;
        return data;
    };
}
