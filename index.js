var eslint  = require('gulp-eslint');

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

    var src = ctx.vfs.src(input);


    if (ctx.trigger.type === 'command') {
        src.pipe(eslint(user || config))
            .pipe(eslint.format())
            .pipe(eslint.failOnError())
            .on('finish', deferred.resolve)
            .on('error', function (err) {
                console.log(err.message);
            });
    } else {
        src.pipe(eslint(user || config))
            .pipe(eslint.format())
            .on('finish', deferred.resolve);
    }
}

/**
 * Also Export BrowserSync instance
 * @type {Object|*}
 */
module.exports.tasks = tasks;