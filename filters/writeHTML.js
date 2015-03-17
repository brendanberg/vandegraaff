var mustache = require('mustache');
var fs = require('fs-extra');
var path = require('path');
var urlify = require('./urlify');

var templatesDir = fs.readdirSync(config.directories.templates);
var partials = {};
for(var i=0; i<templatesDir.length; i++) {
    partials[templatesDir[i].replace(".mustache", "")] = fs.readFileSync(
        path.join(config.directories.templates, templatesDir[i]), 'utf8'
    );
}

module.exports = function(tmplFile) {
    return function(data) {
        var tmplFilePath = path.join(config.directories.templates, tmplFile + ".mustache");
        var tmplSource = fs.readFileSync(tmplFilePath, 'utf8');

        //TODO [Brendan]: De-fang template data before rendering
        var renderedContent = mustache.render(tmplSource, data, partials);
        var outputPath = path.join(config.directories.output, this.route);
		// Crockford's a weenie, but I don't want JSLint to hurt my feelings.
        var computedOutputPath; 

        outputPath = outputPath.replace(/\/$/, '') + '/index.html';
        computedOutputPath = urlify(mustache.render(outputPath, data));
        console.log('Saved ' + computedOutputPath);
        fs.outputFileSync(computedOutputPath, renderedContent);
    }
}
