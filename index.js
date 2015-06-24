var eslint  = require('gulp-eslint');
var resolve = require('path').resolve;

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
    var user   = ctx.options.get('eslint');

    var config = {
        envs: ['es6', 'node'],
        rules: {
            'strict': false
        }
    };

    if (ctx.trigger.type === 'watcher') {
        ctx.vfs.src(ctx.trigger.filepath)
            .pipe(eslint(user || config))
            .pipe(eslint.format())
            .on('finish', deferred.resolve)
            .on('error', deferred.reject);
    } else {
        ctx.vfs.src(input)
            .pipe(eslint(user || config))
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