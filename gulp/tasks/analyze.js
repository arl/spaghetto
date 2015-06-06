module.exports = function (gulp, plug) {
  'use strict';


  /**
  * Lint the code, create coverage report, and a visualizer
  * @return {Stream}
  */
  gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');

    var merge = require('merge2');

//    log('analyze bypassed for now, too many errors in jquery.terminal.js');
//    return;

    var sources = [].concat(config.js, config.nodejs, '!' + config.components.scripts);

//    var jshint = analyzejshint([].concat(config.js, config.specs, config.nodejs));
//    var jscs = analyzejscs([].concat(config.js, config.nodejs));
    var jshint = analyzejshint(sources.concat(config.specs));
    var jscs = analyzejscs(sources);

    startPlatoVisualizer();

    return merge(jshint, jscs);
  });

  /**
  * Execute JSHint on given source files
  * @param  {Array} sources
  * @param  {String} overrideRcFile
  * @return {Stream}
  */
  function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');

    return gulp
      .src(sources)
      .pipe(plug.jshint(jshintrcFile))
      .pipe(plug.jshint.reporter());
  }

  /**
  * Execute JSCS on given source files
  * @param  {Array} sources
  * @return {Stream}
  */
  function analyzejscs(sources) {
    log('Running JSCS');

    return gulp
      .src(sources)
      .pipe(plug.jscs('./.jscsrc'));
  }

  /**
   * Start Plato inspector and visualizer
   */
   function startPlatoVisualizer() {

     log('Running Plato');
     var plato = require('plato');
     var files = glob.sync('./src/client/app/**/*.js');
     var excludeFiles = /\/src\/client\/app\/.*\.spec\.js/;

     var options = {
       title: 'Plato Inspections Report',
       exclude: excludeFiles
     };
     var outputDir = './report/plato';

     plato.inspect(files, outputDir, options, platoCompleted);

     function platoCompleted(report) {
       var overview = plato.getOverviewReport(report);
       log(overview.summary);
     }
   }

};
