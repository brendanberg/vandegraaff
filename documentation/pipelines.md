# Pipelines

Pipelines define a sequence of transformations for a site's data from source
to output.
A pipeline consists of a list of [filters][filter-docs] where each filter's
output is fed into the following filter as input.

The routes file is where developers construct pipelines that define build
behaviors for different categories of pages. Pipelines defined in the routes
file start with a pattern string, followed by the sequence of filters.

__As an example,__ here's a route pipeline for a hypothetical group of product
pages:

    [
      "/product/{{ sku }}/{{ name }}", open('products.json'), loadJSON,
      select('*'), renderTemplate('product.html'), write
    ]

The `open` filter loads the specified file and returns its contents.
Its output is passed into the `loadJSON` filter, which parses the input string
as JSON and returns a JavaScript object.
The `select` filter takes a selector string as an argument and performs a
query on the passed in with the selector.
Since the `select` filter returns a list, the remainder of the pipeline
starting with `renderTemplate` will be executed *n* times--processing each
item in the list separately.
This way, the template can be rendered for each item in the collection of
product objects.
Finally, the HTML output returned by the `renderTemplate` filter is passed to
the `write` filter, which writes the input to a file whose name is defined by
the initial pattern string, populated with data from the current object in the
pipeline.

## The `pipeline` Filter

In addition to the pipelines used in the route definitions, there is a
`pipeline` filter that may be used in the routes themselves.
This filter is discussed in depth in the [filter documentation][filter-docs],
but it allows a "tributary" pipeline to be executed and joined with the main
pipeline.

[filter-docs]: https://github.com/brendanberg/vandegraaff/blob/master/documentation/filters.md
