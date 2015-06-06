module.exports = function (gulp, plug) {
  'use strict';

  /**
  * Copy fonts
  * @return {Stream}
  */
  gulp.task('fonts', function() {
    log('Copying fonts');

    var dest = config.build + 'fonts/';
    return gulp
    .src(config.fonts)
    .pipe(gulp.dest(dest));
  });

  /**
  * Compress images
  * @return {Stream}
  */
  gulp.task('images', ['components'], function() {
    var dest = config.build + 'images/';

    log('Compressing, caching, and copying images');

    return gulp
      .src(config.images)
      .pipe(
        plug.cache(
          plug.imagemin({ optimizationLevel: 3 })
      ))
      .pipe(gulp.dest(dest));
  });
};
