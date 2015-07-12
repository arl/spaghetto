module.exports = function (gulp, plug) {
  'use strict';

  // TODO : move this task to opencog workbench, and out of spaghetto
  gulp.task('oc-workbench-welcome', function() {

    var ocLogo = Array('',
    '                                à"^``    ``"²ì',
    '                                Ñ            ╫',
    '                              =ª^             `"%═ ',
    '                           ="                      ª═ ',
    '                    =ªª«%%                           `≈%ª¬ª,',
    '                   Θ              -r²\'````"²%─             `═',
    '                  ╝            -²              ²=           `═',
    '                 ò           .²     .=o%«a=.     ╙,          ².',
    '                .Ñ          .^    ╓M        "»    ²>          ╫',
    '                :╗          ▒    ╔            ▒    ╠         .╝',
    '                   "H       ╡    ▒            ╚    j       ▒`',
    '                    ▒       ▒    ╚            ╩    ╠       ▒',
    '                    ╠       `.    ^═²       ╓º    ,M      .`',
    '                     ▒       `w     `²«>∞«²`     ╓┘       ╝',
    '                     `N        ^=              -²        ╝',
    '                      ╔\'          ^%=..  ..=≥²           9',
    '                     ó`                                  ╚┐',
    '                     `î.                                ╓M',
    '                       `ª┬                            ="',
    '                          "9╥. .à``"¬ªª%ªªª"\'`"=  .»M`',
    '                              "`                "`',
    '');

    // WELCOME MESSAGE
    log(chalk.blue.bold(ocLogo.join('\n')));
    log(chalk.red.bold('OpenCog Workbench'));

    // TODO
    log(chalk.blue('TODO'), 'BOWER : js libs in src/app/content/js can ALSO be managed with bower, see http://bower.io/');

    // IDEA
    log(chalk.green('IDEA'), 'a simple HELP or WIKI module linking to OpenCog wiki pages for example');

    // BUG
    log(chalk.yellow('BUG'), 'busy overlay not shown in build mode');
    log(chalk.cyan('BUG'), 'gulp test/autotest --startServers crash :\n\tsee ==>\t\thttps://bitbucket.org/panty79/ocworkbench/issue/4');
  });
};
