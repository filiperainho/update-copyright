/*!
 * update-copyright <https://github.com/jonschlinkert/update-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var assert = require('assert');
var update = require('./');

describe('update', function () {
  it('should return a copyright statement with the current year', function () {
    assert.equal(update(), 'Copyright (c) 2015, Jon Schlinkert (https://github.com/jonschlinkert).');
  });

  it('should update the year:', function () {
    assert.equal(update('Copyright (c) 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  it('should add a copyright symbol if it is missing:', function () {
    assert.equal(update('Copyright 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(update('Copyright 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  it('should correct the author using the one from package.json:', function () {
    assert.equal(update('Copyright (c) 2013, Jon Schlinert.'), 'Copyright (c) 2013-2015, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2013, Jon Shliner.'), 'Copyright (c) 2013-2015, Jon Schlinkert.');
  });

  it('should update a range of years:', function () {
    assert.equal(update('Copyright (c) 2013-2014, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2009, 2011-2014, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2009, 2011-2015, Jon Schlinkert, Brian Woodward.');
  });

  it('should not update the year when already up to date:', function () {
    assert.equal(update('Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  it('should allow an author to be passed:', function () {
    assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
      author: 'Jon Schlinkert'
    }), 'Copyright (c) 2013-2015, Jon Schlinkert.');
  });

  it('should allow a custom template to be passed:', function () {
    var tmpl = '/* Copyright (c) <%= years %>, <%= author %>. */';

    assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
      template: tmpl, author: 'Jon Schlinkert'
    }), '/* Copyright (c) 2013-2015, Jon Schlinkert. */');
  });

  it('should add a complete copyright statement when part of it is missing:', function () {
    assert.equal(update('Copyright (c) 2013.', {
      author: 'Jon Schlinkert'
    }), 'Copyright (c) 2013-2015, Jon Schlinkert.');

    assert.equal(update('Copyright (c) .', {
      author: 'Jon Schlinkert'
    }), 'Copyright (c) 2015, Jon Schlinkert.');

    assert.equal(update('Copyright (c) .'), 'Copyright (c) 2015, Jon Schlinkert.');
  });
});

describe('parse:', function () {
  it('should parse a copyright statement:', function () {
    var parsed = update.parse('abc\n * Copyright (c) 2014-2015, Jon Schlinkert.\nxyz');
    assert.deepEqual(parsed, {
      input: 'abc\n * Copyright (c) 2014-2015, Jon Schlinkert.\nxyz',
      orig: 'Copyright (c) 2014-2015, Jon Schlinkert.',
      match: {
        statement: 'Copyright (c) 2014-2015, Jon Schlinkert',
        prefix: 'Copyright',
        symbol: '(c)',
        dateRange: '2014-2015',
        first: '2014',
        latest: '2015',
        author: 'Jon Schlinkert'
      },
      updated: 'abc\n * Copyright (c) 2014-2015, Jon Schlinkert.\nxyz',
      revised: 'Copyright (c) 2014-2015, Jon Schlinkert.'
    });
  });
});
