module.exports = function (gulp, plug) {
  'use strict';

  /**
  * Create $templateCache from the html templates
  * @return {Stream}
  */
  gulp.task('templatecache', function() {
    log('Creating an AngularJS $templateCache');

    return gulp
    .src(config.htmltemplates)
    // .pipe(plug.bytediff.start())
    .pipe(plug.minifyHtml({
      empty: true
    }))
    // .pipe(plug.bytediff.stop(common.bytediffFormatter))
    .pipe(plug.angularTemplatecache('templates.js', {
      module: 'app.core',
      standalone: false,
      root: 'app/'
    }))
    .pipe(plug.header(common.createComments(spaghetto_version)))
    .pipe(gulp.dest(config.build + 'js/'));
  });

  /**
  * Minify and bundle the app's JavaScript
  * @return {Stream}
  */
  gulp.task('js', ['analyze', 'templatecache'], function() {
    log('Bundling, minifying, and copying the app\'s JavaScript');

    var source = [].concat(config.js, config.build + 'js/templates.js');
    return gulp
    .src(source)
    .pipe(plug.concat('all.min.js'))
    .pipe(plug.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify({
      mangle: true
    }))
    .pipe(plug.bytediff.stop(common.bytediffFormatter))
    .pipe(plug.header(common.createComments(spaghetto_version)))
    .pipe(gulp.dest(config.build + 'js/'));
  });

  /**
  * Copy the Vendor JavaScript
  * @return {Stream}
  */
  gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the vendor JavaScript');

    return gulp.src(config.vendorjs)
    .pipe(plug.concat('vendor.min.js'))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify())
    .pipe(plug.bytediff.stop(common.bytediffFormatter))
    .pipe(plug.header(common.createComments(spaghetto_version)))
    .pipe(gulp.dest(config.build + 'js/'));
  });

};
