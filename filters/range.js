var sugar = require('sugar');

module.exports = function (from, to) {
  return function() {
    return Number.range(from, to).every()
  }
}