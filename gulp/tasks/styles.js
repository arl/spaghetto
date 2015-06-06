module.exports = function (gulp, plug) {
  'use strict';

  /**
   * Compile SCSS into CSS
   * @return {Stream}
   */
  gulp.task('scss', function() {
    log('Compiling SCSS --> CSS');

    var merge = require('merge2');

  	return merge(
  		// first sass-compile spaghetto scss files
  		gulp.src(config.scss.entrypoint)
  			.pipe(plug.plumber())
  			.pipe(plug.sass())
  			.on('error', common.errorLogger),
  		// then the components scss
  		gulp.src(config.components.styles)
  			.pipe(plug.plumber())
  			.pipe(plug.sass())
  			.on('error', common.errorLogger)
      )
  	// merge them into one file
  	.pipe(plug.concat('all.css'))
  	.pipe(gulp.dest(config.tmpcss))
  		.pipe(plug.autoprefixer('last 2 version', '> 5%'))
  		.pipe(plug.bytediff.start())
  		.pipe(plug.minifyCss({}))
  		.pipe(plug.bytediff.stop(common.bytediffFormatter))
  		.pipe(plug.rename('all.min.css'))
  	// output an optimized file for build mode
    .pipe(plug.header(common.createComments(spaghetto_version)))
  	.pipe(gulp.dest(config.build + 'css/'));
  });

  /**
   * Minify and bundle the Vendor CSS
   * @return {Stream}
   */
  gulp.task('vendorcss', function() {
    log('Compressing, bundling and copying the vendor CSS');

    var vendorFilter = plug.filter(['**/*.css']);

    return gulp.src(config.vendorcss)
      .pipe(vendorFilter)
      .pipe(plug.concat('vendor.min.css'))
      .pipe(plug.bytediff.start())
      .pipe(plug.minifyCss({}))
      .pipe(plug.bytediff.stop(common.bytediffFormatter))
      .pipe(plug.header(common.createComments(spaghetto_version)))
      .pipe(gulp.dest(config.build + 'css/'));
  });


  /**
   * Watch SCSS
   * @return {Stream}
   */
  gulp.task('scss-watcher', function() {
    log('Watching for SCSS file changes');

    // watch and compile into css
    gulp.watch([config.scss.files, config.components.styles], ['scss']);
  });

  /**
   * Remove all styles from the build and temp folders
   * @param  {Function} done - callback when complete
   */
  gulp.task('clean-styles', function(done) {
      var files = [].concat(
          config.tmpcss + '*.css',
          config.build + 'content/**/*.css'
      );
      common.clean(files, done);
  });
};
