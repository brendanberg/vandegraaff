#! /usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var vm = require('vm');
var sugar = require('sugar');

/* globlal */ config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var filters = { require: require, console:console }
var filterDirs = ['filters'];

if (config.directories.filters) {
	filterDirs.push(config.directories.filters);
}

for (var d in filterDirs) {
	fs.readdirSync(filterDirs[d]).forEach(function(file) {
		// Only include files that end in '.js' and are not hidden
		if (file.match(/^[^.].+\.js$/)) {
			// TODO: wrap in try / catch to provide better error reporting if
			// the required file contains a syntax error.
			filters[path.basename(file,".js")] = require("./" + filterDirs[d] + "/" + file);
		}
	});
}

var routesPath = process.argv[2];

if (!routesPath) {
	process.stderr.write("Error: Expected a path to a routes file\n")
	process.exit(1);
}

var routeSource = fs.readFileSync(routesPath, 'utf8');
var routes = vm.runInNewContext(routeSource, filters);

fs.removeSync(config.directories.output);
console.log('Deleted ' + config.directories.output);

fs.copySync(config.directories.static, config.directories.output);
console.log('Copied ' + config.directories.static + ' to ' + config.directories.output);

var routeSeparator = process.argv.indexOf('--')
var routeList = [];

if (routeSeparator >= 0) {
	var temp = [];
	routeList = process.argv.slice(routeSeparator + 1);

	for (var i in routes) {
		// Iterate over route names from command line args and if the name
		// matches exactly, push it onto a new list of routes.
		// TODO: Maybe allow regexes when matching route names
		if (routeList.indexOf(routes[i][0]) != -1) {
			temp.push(routes[i]);
		}
	}
	routes = temp;
}

for (var i in routes) {
	var route = routes[i][0];
	var ctx = {route: route};
	filters['pipeline'].apply(ctx, routes[i].slice(1));
}
