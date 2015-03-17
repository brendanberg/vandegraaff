var path = require("path");
var fs = require("fs");
var yaml = require("js-yaml");

module.exports = function(file) {
  return function() {
    return yaml.safeLoad(fs.readFileSync(path.join(config.directories.data, file + '.yaml'), 'utf8'));
  }
}
