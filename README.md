# update-copyright [![NPM version](https://badge.fury.io/js/update-copyright.svg)](http://badge.fury.io/js/update-copyright)  [![Build Status](https://travis-ci.org/jonschlinkert/update-copyright.svg)](https://travis-ci.org/jonschlinkert/update-copyright)

> Update a copyright statement with the current year. Also makes minor corrections.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i update-copyright --save
```

## Usage

```js
copyright(string, options);
```

Pass a string with a copyright statement to update, and it will be parsed and updated.

```js
var copyright = require('update-copyright');

copyright('Copyright (c) 2014, Jon Schlinkert.');
//=> 'Copyright (c) 2014-2015, Jon Schlinkert.'

copyright('Copyright (c) 2015, Jon Schlinkert.');
//=> 'Copyright (c) 2015, Jon Schlinkert.'
```

The [current year](https://github.com/jonschlinkert/update-year) is updated/appended to existing years. The rest of the information will stay the same unless new information is passed.

**Examples**

If the author is missing it will be filled in with the author from package.json.

```js
copyright('Copyright (c) 2014.');
//=> 'Copyright (c) 2014-2015, Jon Schlinkert.'
```

It will also use the author from package.json if a misspelling is suspected:

```js
copyright('Copyright (c) 2014, Jon Shlinert');
//=> 'Copyright (c) 2014-2015, Jon Schlinkert.'
```

See [the tests](./tests.js) for more examples.

## Options

A template is used to create the new copyright statement, and the options object is merged with the context that is passed to the template.

**Notes**

1. The (context) object is populated with data from the parsed (old) copyright statement
2. The object is then updated with the current year, author from package.json, and any other data you pass on the options.

This is what the context object looks like, any of these can be updated via options:

```js
{ year: 2015,
  prefix: 'Copyright',
  symbol: '(c)',
  verbose: true,
  template: '<%= prefix %><%= symbol ? (" " + symbol + " ") : "" %><%= years %>, <%= author %>.',
  statement: 'Copyright (c) 2015, Jon Schlinkert',
  dateRange: '2014',
  latest: '2014',
  author: 'Jon Schlinkert',
  years: '2015' }
```

**Example**

Pass any custom data (as shown above) on the options:

```js
copyright('Copyright (c) 2014.', {author: 'Foo Bar'});
//=> 'Copyright (c) 2014-2015, Foo Bar.'
```

## Run tests

Install dev dependencies:

```bash
node i -d && mocha
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/update-copyright/issues)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 17, 2015._