var path = require("path");
var fs = require("fs");

module.exports = function(file) {
  return function() {
    return JSON.parse(fs.readFileSync(path.join(config.directories.data, file + ".json"), 'utf8'));
  }
}