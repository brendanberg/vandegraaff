var markdown = require("marked");
var path = require("path");
var fs = require("fs");

module.exports = function(file) {
  return function() {
    return markdown(fs.readFileSync(path.join(config.directories.data, file + ".md"), "utf8"));
  }
}