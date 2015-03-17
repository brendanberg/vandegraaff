var path = require("path");
var fs = require("fs");

module.exports = function(file) {
  return function() {
    return fs.readFileSync(path.join(config.directories.data, file), "utf8");
  }
}