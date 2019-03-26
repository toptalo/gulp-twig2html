'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const twig2html = require('./');

gulp.task('twig2html-pages', () => {
    return gulp.src('test/fixtures/pages/*.twig')
        .pipe(twig2html({
            globals: './test/fixtures/globals.json',
            context: {
                year: 2017
            },
            namespaces: {
                blocks: './test/fixtures/blocks/'
            }
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('tmp'));
});

gulp.task('twig2html-functions', () => {
    return gulp.src('test/fixtures/functions/*.twig')
        .pipe(twig2html({
            globals: './test/fixtures/globals.json',
            functions: {
                greeting: function (name) {
                    return 'Hello, ' + name + '!';
                }
            },
            context: {
                name: 'Victor'
            }
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('tmp'));
});

gulp.task('twig2html-filters', () => {
    return gulp.src('test/fixtures/filters/*.twig')
        .pipe(twig2html({
            globals: './test/fixtures/globals.json',
            filters: {
                tel: function (str) {
                    return str.replace(/([^0-9+])/g, '');
                }
            },
            context: {
                phone: '+7 (999) 888-77-66'
            }
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('tmp'));
});


gulp.task('default', gulp.parallel(
    'twig2html-pages',
    'twig2html-functions',
    'twig2html-filters'
));
