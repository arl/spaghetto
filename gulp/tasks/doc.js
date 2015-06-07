module.exports = function (gulp, plug) {
  'use strict';

  /**
   * generate documentation pages with ngdocs
   */
  gulp.task('doc', function (cb) {

    debugger;
    var gulpDocs = require('gulp-ngdocs');
    var options = {
      title: config.doc.title,
      startPage: config.doc.startPage,
      html5Mode: false,
      image: "./ngdocs_assets/spaghetto.png",
      // navTemplate: './ngdocs_assets/docnav.html',
      styles: [ 'ngdocs_assets/spaghetto-docs.css' ],
      scripts: [ 
        'bower_components/jquery/dist/jquery.js',
        'ngdocs_assets/spaghetto-docs.js'        
        ]
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
