module.exports = function (gulp, plug) {
  'use strict';

  /**
  * List up the most important gulp tasks
  */
  gulp.task('help', function() {

    var tasklist = {
      'serve-dev' :
        'serve the development environment, watch for changes and reload',
      'build' :
        'build production optimized code into build folder',
      'serve-build' :
        'serve the build environment, watch for changes and reload',
      'serve-doc' :
        'generate documentation and serve it',
      'test' :
        'run tests once and serve reports',
      'autotest' :
        'run tests and serve reports, re-run and reload on changes',
      'analyze' :
        'run jshint, jscs and create a plato code report in /report '
    }

    // look up for the longest task name
    var longlen = 0;
    for (var name in tasklist) {
      longlen = name.length > longlen ? name.length : longlen;
    }

    log();
    for (var name in tasklist) {
      var fill = longlen - name.length + 5;
      log(chalk.green(name) + Array(fill).join(' ') + chalk.bold(tasklist[name]));
    }
    log();
  });

  gulp.task('welcome', function(cb) {
    log(spaghetto_logo);
    cb();
  });

  gulp.task('default', ['welcome', 'help']);
};
