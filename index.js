var eslint  = require('gulp-eslint');
var resolve = require('path').resolve;

var defaults = {
    envs: ['es6', 'node'],
    rules: {
        'strict': false
    }
};

/**
 * Define the tasks that make up a build
 * @type {Object}
 */
var tasks    = [eslintJs];

/**
 * Process eslint
 * @param deferred
 * @param previous
 * @param ctx
 */
function eslintJs (deferred, previous, ctx) {

    var input  = ctx.path.make('eslint', 'input');
    var config = ctx.options.get('eslint');

    if (config) {
        if (typeof config === 'string') {
            config = ctx.resolve(config);
        }
    } else {
        if (ctx.exists('.eslintrc')) {
            config = ctx.resolve('.eslintrc');
        }
    }

    if (!config) {
        config = defaults;
    }

    if (ctx.trigger.type === 'watcher') {
        ctx.vfs.src(ctx.trigger.filepath)
            .pipe(eslint(config))
            .pipe(eslint.format())
            .on('finish', deferred.resolve)
            .on('error', deferred.reject);
    } else {
        ctx.vfs.src(input)
            .pipe(eslint(config))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .on('end', deferred.resolve)
            .on('error', deferred.reject);
    }
}

/**
 * Also Export BrowserSync instance
 * @type {Object|*}
 */
module.exports.tasks = tasks;