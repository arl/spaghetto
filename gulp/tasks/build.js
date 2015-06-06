module.exports = function (gulp, plug) {
  'use strict';

  /*
   * Build all (index.html & injection, images and fonts)
   * @return {Stream}
   */
  gulp.task('build-all', ['inject', 'images', 'fonts'], function() {

    log('Building All')
    log('Enabling ng-strict-di');

    // add ng-strict-di to ng-app
    return gulp.src(config.build + 'index.html', { base : './' } )
      .pipe(plug.replace('html data-ng-app=\"app\"', 'html data-ng-app=\"app\" ng-strict-di'))
      .pipe(gulp.dest('./'));
  });


  /**
   * Build the optimized app
   * @return {Stream}
   */
  gulp.task('build', ['build-all'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
      onLast: true,
      message: 'Deployed code!'
    }));
  });

  /**
   * Inject minified files into the new index.html
   * @return {Stream}
   */
  gulp.task('inject', ['js', 'vendorjs', 'scss', 'vendorcss'], function() {
    log('Injecting minified files into index.html');

    var minifiedJs = config.build + 'js/**/*.min.*';
    var minifiedCss = config.build + 'css/**/*.min.*';
    var index = config.client + 'index.html';
    var minJsFilter = plug.filter(['**/*.min.js']);
    var minCssFilter = plug.filter(['**/*.min.css', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    return gulp
      .src([].concat(minifiedJs, minifiedCss, index)) // add all built min files and index.html
      .pipe(minJsFilter)                              // filter the stream to minified js
        .pipe(gulp.dest(config.build + 'js/'))      // write minified js
      .pipe(minJsFilter.restore())                    // remove filter, back to original stream
      .pipe(minCssFilter)                             // filter the stream to minified css
        .pipe(gulp.dest(config.build + 'css/'))     // write minified css
      .pipe(minCssFilter.restore())                   // remove filter, back to original stream

      // inject the files into index.html
      .pipe(indexFilter)
      .pipe(inject('css/vendor.min.css', 'inject-vendor'))
        .pipe(inject('css/all.min.css'))
        .pipe(inject('js/vendor.min.js', 'inject-vendor'))
        .pipe(inject('js/all.min.js'))
        .pipe(gulp.dest(config.build))
      .pipe(indexFilter.restore());

    function inject(path, name) {
      var pathGlob = config.build + path;
      var options = {
          ignorePath: config.build.substring(1),
          read: false
      };
      if (name) {
          options.name = name;
      }
      return plug.inject(gulp.src(pathGlob), options);
    }
  });

  /**
   * Main watch task, start tasks corresponding to the filetype of changed file
   */
  gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(config.css, config.vendorcss);
    var images = ['gulpfile.js'].concat(config.images);
    var js = ['gulpfile.js'].concat(config.js);

    gulp.watch(js, ['js', 'vendorjs'])
      .on('change', logWatch);

    gulp.watch(css, ['scss', 'vendorcss'])
      .on('change', logWatch);

    gulp.watch(images, ['images'])
      .on('change', logWatch);

    function logWatch(event) {
      log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
  });
};
