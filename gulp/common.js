(function (common) {
    var commentWrapper = require('./commentWrapper.js');

    common.createComments = createComments;
    common.formatPercent = formatPercent;
    common.bytediffFormatter = bytediffFormatter;



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

    function formatPercent(num, precision){
        return (num*100).toFixed(precision);
    }

})(module.exports)
