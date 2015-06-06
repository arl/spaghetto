module.exports = function (gulp, plug) {
  'use strict';
  
  var port = process.env.PORT || 7203;

  /**
  * serve the dev environment,
  * compile scss and watch them
  */
  gulp.task('serve-dev', ['scss', 'scss-watcher', 'components'], function() {
    serve({
      mode: 'dev'
    });
  });

  /**
  * build and serve the build environment
  */
  gulp.task('serve-build', ['scss-watcher'], function() {
    serve({
      mode: 'build'
    });
  });

  /**
  * build and serve the distribution (no watchers)
  */
  gulp.task('serve-dist', function() {

    return gulp.src('').pipe(plug.notify({
      title: "Spaghetto Error",
      onLast: true,
      message: 'gulp serve-dist is not implemented'
    }));
    // serve({
    //     mode: 'dist'
    // });
  });


  // create a named browser-sync instance
  var bsClient = browserSync.create("bsClient");

  /**
  * Start the node server using nodemon.
  * Optionally start the node debugging.
  * @param  {Object} args - debugging arguments
  */
  function serve(args) {
    var options = {
      script: config.server + 'app.js',
      delayTime: 1,
      env: {
        'NODE_ENV': args.mode,
        'PORT': port
      },
      watch: [config.server]
    };

    var exec;
    if (args.debug) {
      log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
      exec = require('child_process').exec;
      exec('node-inspector');
      options.nodeArgs = [args.debug + '=5858'];
    }

    return plug.nodemon(options)
    .on('start', function() {
      startBrowserSync(args.mode === 'dev');
    })
    //.on('change', tasks)
    .on('restart', function() {
      log('restarted!');
      setTimeout(function () {
        bsClient.reload({ stream: false });
      }, 1000);
    });
  }

  /**
  * Start BrowserSync
  */
  function startBrowserSync(isDev) {

    if(bsClient.active) {
      return;
    }

    log('Starting BrowserSync on port ' + port);

    // places some watches before starting the browser
    if (isDev == false) {
      gulp.watch(
        // watch everything that could change in the dev part
        [config.scss.files, config.components.styles, config.js, config.html],

        // => trigger minification/injection on change, and reload browser-sync
        ['inject', bsClient.reload]
      ).on('change', changeEvent);
    }

    var options = {
      proxy: 'localhost:' + port,
      port: 3000,
      files: isDev ? [
        config.client + '**/*.*',
        config.tmpcss + '*.css',
        '!' + config.scss.files,
        '!' + config.components.styles,
        '!' + config.test + '**/*.*'
      ] : [config.build + '**/*.*'],
      ghostMode: { // these are the defaults t,f,t,t
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'warn',
      logPrefix: 'spaghetto',
      notify: true,
      reloadDelay: 1000
    };

    bsClient.init(options);
  }

  /**
  * When files change, log it
  * @param  {Object} event - event that fired
  */
  function changeEvent(event) {
    log('File ' + event.path + ' ' + event.type);
  }
};
