'use strict';

const PluginError = require('plugin-error');
const Twig = require('twig');
const through = require('through2');
const extend = require('extend');

const fs = require('fs');

const PLUGIN_NAME = 'gulp-twig2html';

module.exports = params => {
    let genericContext = {};

    const options = extend({
        globals: '',
        extensions: [],
        functions: {},
        filters: {},
        context: {},
        namespaces: {}
    }, params);

    if (!Array.isArray(options.extensions)) {
        throw new PluginError(PLUGIN_NAME, 'extensions has to be an array of functions!', options);
    }

    options.extensions.forEach(function (fn) {
        Twig.extend(fn);
    });

    Object.keys(options.functions).forEach(name => {
        let fn = options.functions[name];
        if (typeof fn !== 'function') {
            throw new PluginError(PLUGIN_NAME, `${name} needs to be a function!`, options);
        }
        Twig.extendFunction(name, fn);
    });

    Object.keys(options.filters).forEach(name => {
        let fn = options.filters[name];
        if (typeof fn !== 'function') {
            throw new PluginError(PLUGIN_NAME, `${name} needs to be a function!`, options);
        }
        Twig.extendFilter(name, fn);
    });

    if (options.globals && typeof options.globals === 'string' && fs.existsSync(options.globals)) {
        try {
            genericContext = extend({}, genericContext, JSON.parse(fs.readFileSync(options.globals, 'utf8')));
        } catch (error) {
            throw new PluginError(PLUGIN_NAME, error, options);
        }
    }

    genericContext = extend({}, genericContext, options.context);

    return through.obj(function (file, enc, next) {
        if (file.isNull()) {
            next(null, file);
            return;
        }

        let filePath = file.path;
        let templatePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        let templateFile = filePath.substr(filePath.lastIndexOf('/') + 1);
        let templateName = templateFile.substr(0, templateFile.lastIndexOf('.')) || templateFile;
        let templateContextFile = `${templatePath}${templateName}.json`;
        let context = genericContext;

        if (fs.existsSync(templateContextFile)) {
            context = extend({}, genericContext, JSON.parse(fs.readFileSync(templateContextFile, 'utf8')));
        }

        const twig2html = (chunk, enc, callback) => {
            try {
                let output = Twig.twig({
                    cache: false,
                    async: false,
                    allowInlineIncludes: true,
                    data: chunk.toString(),
                    path: filePath,
                    namespaces: options.namespaces
                }).render(context);

                let contents = Buffer.from(output, enc);

                if (next === callback) {
                    file.contents = contents;
                    callback(null, file);
                    return;
                }
                callback(null, contents);
                next(null, file);
            } catch (err) {
                let opts = extend({}, options, {fileName: filePath});
                let error = new PluginError(PLUGIN_NAME, err, opts);
                if (next !== callback) {
                    next(error);
                    return;
                }
                callback(error);
            }
        };

        if (file.isStream()) {
            file.contents = file.contents.pipe(through(twig2html));
        } else {
            twig2html(file.contents, null, next);
        }
    });
};
