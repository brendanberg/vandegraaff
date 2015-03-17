var sugar = require('sugar');

module.exports = function(objs) {
  return objs.reduce(function(p, c) {
    return Object.merge(p, c);
  }, {})
}