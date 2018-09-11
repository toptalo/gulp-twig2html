[![Build Status](https://travis-ci.org/toptalo/gulp-twig2html.svg?branch=master)](https://travis-ci.org/toptalo/gulp-twig2html)

# gulp-twig2html

> A static site compiler for gulp based on [Twig.js](https://github.com/twigjs/twig.js/wiki)

> Twig.js is a pure JavaScript implementation of the Twig PHP templating language (https://twig.symfony.com/)

## Install

```shell
npm install --save-dev gulp-twig2html
```

## The "twig2html" task

### Usage

```js
const gulp = require('gulp');
const rename = require('gulp-rename');
const twig2html = require('gulp-twig2html');

gulp.task('twig2html', () => {
  return gulp.src('src/*.twig')
    .pipe(twig2html({
        // Task-specific options go here.
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});
```

### Options

#### options.globals
Type: `String`
Default value: `''`

Path to JSON file with global context variables.

#### options.extensions
Type: `Array`
Default value: `[]`

Can be an array of functions that extend TwigJS with [custom tags](https://github.com/twigjs/twig.js/wiki/Extending-twig.js-With-Custom-Tags).

#### options.functions
Type: `Object`
Default value: `{}`

Object hash defining [functions in TwigJS](https://github.com/twigjs/twig.js/wiki/Extending-twig.js#functions).

#### options.filters
Type: `Object`
Default value: `{}`

Object hash defining [filters in TwigJS](https://github.com/twigjs/twig.js/wiki/Extending-twig.js#filters).

#### options.context
Type: `Object`
Default value: `{}`

Object hash defining templates context variables.

#### options.separator
Type: `String`
Default value: `'\n'`

A string that is inserted between each compiled template when concatenating templates.

### Usage Examples

```js
const gulp = require('gulp');
const rename = require('gulp-rename');
const twig2html = require('gulp-twig2html');

gulp.task('twig2html', () => {
  return gulp.src('src/*.html')
    .pipe(twig2html({
        context: {}, // task specific context object hash
        globals: 'path/to/globals.json'
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});
```

#### Context hierarchy

Template context extends in this order:
* `options.globals` if provided
* `options.context` if provided
* template JSON context files (stored in template path, with same name,
example: `/templates/index.json` for `/templates/index.twig`) if provided

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [ESLint](https://eslint.org/) and [Jest](https://jestjs.io/).

## Sponsored by

[![DesignDepot](https://designdepot.ru/static/core/img/logo.png)](https://designdepot.ru/?utm_source=web&utm_medium=npm&utm_campaign=gulp-twig2html)

## Release History
See the [CHANGELOG](CHANGELOG.md).
