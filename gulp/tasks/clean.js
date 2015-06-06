module.exports = function (gulp, plug) {
  'use strict';
  
  /**
   * Remove all files from the build folder
   * One way to run clean before all tasks is to run
   * from the cmd line: gulp clean && gulp build
   * @return {Stream}
   */
  gulp.task('clean', function(cb) {

    var delPaths = [].concat(config.build, config.report, config.doc.output);
    delPaths.forEach(function(element, index){
        log('Cleaning: ' + chalk.blue(element));
        del(element);
    });
    cb();
  });
};
