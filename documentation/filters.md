# Filters

Filters are functions that perform a transformation on a single data parameter
and return a data value.
Depending on whether the returned item is a scalar value or a list determines
the behavior of the subsequent filters in the pipeline.

Some filters take arguments when specified in a pipeline.
For example, the `group` filter takes a parameter that defines the key on
which to group a list of objects. These parameters are specified as arguments
to a function call. Other filters that take no arguments must not be followed
by parenthesized arguments.

If a filter returns a scalar value, the next filter in the pipeline is called
with the previous filter's result as input.
When a filter returns a list, each item in the list is passed through the rest
of the pipeline in turn.
This allows a single route to generate a collection of pages.
For example, a `/people/{{ name }}` route might perform a query that returns
a list of person objects, each of which would work its way through the pipeline
to generate an individual file.

Van de Graaff comes with a number of general-purpose filters that do most of
the tasks you'd want to do. 
In addition to filters that query, map, parse, and render data, there are two
special filters, `join` and `split` that do not have any logic of their own,
but trigger special behavior in the Van de Graaff script.

## Built-in Filters

The following general-purpose filters ship with Van de Graaff.

__Flatten__

The `flatten` filter takes a list with nested lists as items and returns a
flattened list with all items at the top level. 

__Group__

The `group` filter takes a list of objects and groups them into buckets based
on the value of a specified key. For example, if a list of objects all have a
`category` parameter, the group filter would return a list of objects with
`key` and `values` parameters. For example, given the following input:

```
[
	{category: 'drawing', title: 'Untitled (Shoe)'},
	{category: 'painting', title: 'Gold Marilyn'},
	{category: 'sculpture', title: 'Brillo Box'},
	{category: 'drawing', title: 'Roll of Bills'},
	{category: 'painting', title: 'Flowers'},
	{category: 'sculpture', title: 'Silver Clouds'},
	{category: 'painting', title: 'Double Elvis'},
	{category: 'photograph', title: 'Self-Portrait'}
]
```

The filter `group('category')` would return the following output:

```
[
	{key: 'drawing', values: [
		{category: 'drawing', title: 'Untitled (Shoe)'},
		{category: 'drawing', title: 'Roll of Bills'},
	]},
	{key: 'painting', values: [
		{category: 'painting', title: 'Double Elvis'},
		{category: 'painting', title: 'Flowers'},
		{category: 'painting', title: 'Gold Marilyn'},
	]},
	{key: 'sculpture', values: [
		{category: 'sculpture', title: 'Brillo Box'},
		{category: 'sculpture', title: 'Silver Clouds'},
	]},
	{key: 'photograph', values: [
		{category: 'photograph', title: 'Self-Portrait'}
	]}
]
```

__Join__

The `join` filter triggers special behavior that changes how the Van de Graaff
pipeline treats the result of the previous filter.
Normally, if a filter returns a list of *n* values, the subsequent filters in
the pipeline are called in turn with each value in the list individually.
The `join` filter instead merges the list, passing the entire list of *n* items
as a single argument to the next filter in the pipeline.

__Map__

The `map` filter takes a filter as an argument and applies it to each value
as it passes through the pipeline.

__Set__

The `set` filter sets a value for a property of an object. It takes two
parameters, the property name and the value in the routes definition.

If the value parameter is `undefined`, the `set` filter will remove the
parameter from the object. If the value parameter is a function, the filter
will set the parameter to the value returned by calling the function with
the object being transformed as the only parameter.

For example, consider the pipeline defined below:

```
[
	set('email', 'brendan@example.org'),
	set('age', function(data) { return (new Date()).getFullYear() - data.birthyear }),
	set('birthyear', undefined)
]
```

If the input to the pipeline were the object `{name: 'Brendan', birthyear: 1984}`,
the output would be:

```
{
	name: 'Brendan',
	email: 'brendan@example.org',
	age: 31
}
```

__Split__

The `split` filter is the opposite of `join`. It takes what would normally be
a single list argument to the subsequent filter and splits it,
passing each item in the list into the next filter in the pipeline in turn.

## Custom Filters

You can also write custom filters. They must be functions that take a data
parameter and return a data value.
