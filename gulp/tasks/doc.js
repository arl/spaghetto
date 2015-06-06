module.exports = function (gulp, plug) {
  'use strict';

  /**
   * generate documentation pages with ngdocs
   */
  gulp.task('doc', function (cb) {

    var gulpDocs = require('gulp-ngdocs');
    var options = {
      title: config.doc.title,
      startPage: config.doc.startPage
    }

    gulpDocs.sections(config.doc.sections)
      .pipe(gulpDocs.process(options))
      .pipe(gulp.dest(config.doc.output));
    cb();
  });

  /**
  * build documentation, then serve it
  */
  gulp.task('serve-doc', ['doc'], function () {

    var port = 8000;
    var bsNgDocs = browserSync.create("bsNgDocs");

    bsNgDocs.init({
      server: {
        baseDir: config.doc.output
      },
      port: port,
      logPrefix: 'spaghetto-doc'
    });
  });
};
