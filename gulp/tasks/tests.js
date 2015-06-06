module.exports = function (gulp, plug) {
  'use strict';

  /**
   * Run specs once and exit
   * To start servers and run midway specs as well:
   *    gulp test --startServers
   * @return {Stream}
   */
  gulp.task('test', function(done) {
    startTests(true /*singleRun*/ , done);
  });

  /**
   * Run specs and wait.
   * Watch for file changes and re-run tests on each change
   * To start servers and run midway specs as well:
   *    gulp autotest --startServers
   */
  gulp.task('autotest', function(done) {
    startTests(false /*singleRun*/ , done);
  });

  /**
   * Start the tests using karma.
   * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
   * @param  {Function} done - Callback to fire when karma is done
   * @return {undefined}
   */
   function startTests(singleRun, done) {
     var child;
     var excludeFiles = [];
     var fork = require('child_process').fork;
     var karma = require('karma').server;

     if (env.startServers) {
       log('Starting servers');
       var savedEnv = process.env;
       savedEnv.NODE_ENV = 'dev';
       savedEnv.PORT = 8888;
       child = fork('src/server/app.js', childProcessCompleted);
     } else {
       excludeFiles.push('./src/client/test/midway/**/*.spec.js');
     }

     // create a named browserSync instance
     var bsKarmaRpt = browserSync.create("bsKarmaRpt");

     // in autotest mode, karma tests reports are auto-reloaded
     if (!singleRun) {

       bsKarmaRpt.init({
         server: {
           baseDir: './report/karma/',
           directory: true
         },
         ghostMode: false,
         logLevel: 'info',
         logPrefix: 'spaghetto-test',
       });

       gulp.watch('./report/karma/**/*.html').on("change", bsKarmaRpt.reload);
     }

     karma.start({
       configFile: __dirname + '/karma.conf.js',
       exclude: excludeFiles,
       singleRun: !!singleRun
     }, karmaCompleted);

     ////////////////

     function childProcessCompleted(error, stdout, stderr) {
       log('stdout: ' + stdout);
       log('stderr: ' + stderr);
       if (error !== null) {
         log('exec error: ' + error);
       }
     }

     function karmaCompleted() {
       if (child) {
         child.kill();
       }
       done();
     }
   }
};
