var JSONSelect = require("JSONSelect");

module.exports = function(selector) {
  return function (data) {
    return JSONSelect.match(selector, data);
  }
}