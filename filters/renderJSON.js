var fs = require('fs-extra');
var mustache = require('mustache');
var path = require('path');
var urlify = require('./urlify');

module.exports = function (data) {
    var outputPath = path.join(config.directories.output, this.route);
    var computedOutputPath; // Crockford's an idiot, but I don't want JSLint to hurt my feelings.
    outputPath.replace(/\/$/, '');
    outputPath += '.json';

    computedOutputPath = urlify(mustache.render(outputPath, data));
    console.log('Saved ' + computedOutputPath);
    fs.outputFileSync(computedOutputPath, JSON.stringify(data));
};
