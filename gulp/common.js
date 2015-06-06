(function (common) {
  'use strict';

  var commentWrapper = require('./commentWrapper.js');
  var spaghettoLogo = require('./spaghetto-ascii.js');

  common.createComments = createComments;
  common.formatPercent = formatPercent;
  common.bytediffFormatter = bytediffFormatter;
  common.errorLogger = errorLogger;
  common.clean = clean;
  common.logo = clean;

  /**
  * Formatter for bytediff to display the size changes after processing
  * @param  {Object} data - byte data
  * @return {String}      Difference in bytes, formatted
  */
  function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
    (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
    ' and is ' + common.formatPercent(1 - data.percent, 2) + '%' + difference;
  }

  /* Create standard comments header for minified files */
  function createComments(version) {
    var comments = [
      '@license Spaghetto v' + version,
      'https://github.com/aurelien-rainone/spaghetto',
      'Copyright 2015 Aurelien Rainone',
      'License : MIT',
      'Compiled on ' + global.date('mmm d, yyyy h:MM:ss TT Z')
    ];
    return commentWrapper.wrap(comments);
  }

  /**
  * Format a number as a percentage
  * @param  {Number} num       Number to format as a percent
  * @param  {Number} precision Precision of the decimal
  * @return {String}           Formatted percentage
  */
  function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
  }

  /**
  * Log an error message and emit the end of a task
  */
  function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
  }

  /**
  * Delete all files in a given path
  * @param  {Array}   path - array of paths to delete
  * @param  {Function} done - callback when complete
  */
  function clean(path, done) {
    log('Cleaning: ' + chalk.blue(path));
    del(path, done);
  }

})(module.exports)
