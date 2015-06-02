# Van de Graaff

Van de Graaff is a static (website) generator written in JavaScript. It has a
modular architecture that uses pipelines of composable filter functions to
generate and render page content.

Van de Graaff was created by Brendan Berg and Ramsey Nasser for the Eyebeam
Art + Technology Center and is made freely available to the public.

[Documentation](http://brendanberg.github.io/vandegraaff/)

## Installation

Use NPM to install the Node module. (Currently, this is lies.)

`npm install vandegraaff`

## Concepts

Unlike more widely-adopted static site generators, Van de Graaff makes few
assumptions about how you store your data, the structure of the site you are
generating, or your personal feelings regarding Hawaiian pizza.

There are three basic concepts that can be built up to create highly
sophisticated sites.

__Routes__

Van de Graaff takes the familiar concept of routes used in many HTTP server
frameworks and turns it on its head. Instead of defining routes that execute
behavior when an incoming request matches a specified pattern, Van de Graaff
routes start with a filename template and defines a pipeline of operations
to generate content that is written to a file (or files) with a name generated
from the initial template.

Consider the route specification defined below.

`['/about', readYAML('about.yaml'), renderTemplate('about.html'), write]`

Here, the filename template is the string `'about'`. The pipeline is the
sequence of functions that follows.

__Filters__

The pipeline in the previous route example is a list of functions that compose
together to generate the final rendered content. (In the example, the `write`
filter is the name of a function, while `readYAML` and `renderTemplate` are
functions that return closures over the supplied arguments.)

With the exception of the initial filter, which is called with no arguments,
each filter acts on the output of the previous filter.

__Composition__

In the documentation, we will discuss more sophisticated route specifications
and ways to manipulate data as it moves through the pipeline by composing
basic filter operations.

## Who Uses Van de Graaff

- [Eyebeam Art + Technology Center](http://eyebeam.org/)
- [Berg Industries](http://berg.industries/)
