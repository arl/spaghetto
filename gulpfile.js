/* jshint camelcase:false */
var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

/** render config file accessible for all task scripts */
global.config = require('./gulp.config.js')();

/** also some common modules/functions */
global.common = require('./gulp/common.js');
global.del = require('del');
global.glob = require('glob');
global.browserSync = require('browser-sync');

/** and gulp plugins */
global.env = plug.util.env;
global.log = plug.util.log;
global.chalk = plug.util.colors;
global.date = plug.util.date;

/** and some spaghetto specific constants */
global.spaghetto_logo = require('./gulp/spaghetto-ascii.js');
global.spaghetto_version = '0.0.1';

// load task defined in all js files in taskPath
var taskPath = './gulp/tasks/';
var taskList = require('fs').readdirSync(taskPath);
taskList.forEach(function (taskFile) {
    require(taskPath + taskFile)(gulp, plug);
});

/**
 * Gather components images into main content folder
 * they will be served from here in serve-dev mode,
 * in build mode they will be copied to build folder from here
 * @return {Stream}
 */
gulp.task('components', function() {
    log('Gathering components assets into one folder');
	var files = glob.sync(config.components.images);
    return gulp
        .src(files)
        .pipe(gulp.dest(config.imagesDir));
});
