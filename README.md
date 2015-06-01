<p align="center">
  <a href="http://gulpjs.com">
    <img src="https://raw.githubusercontent.com/aurelien-rainone/artwork/master/spaghetto-l.png">
  </a>
</p>


# Easily build modular single page webapps

* [What is Spaghetto?](#what-is-spaghetto)
* [How it works :](#how-it-works-)
* [[live example] : not yet...](#live-example--not-yet)
* [Install](#install)
* [Build the example app](#build-the-example-app)
* [Hack Spaghetto](#hack-spaghetto)
 * [Build it yourself](#build-it-yourself)
 * [Build your app documentation](#build-your-app-documentation)
* [License](#license)


## What is Spaghetto?

Besides being the italian singular for spaghetti, Spaghetto is a framework that
lets you build rich client-side applications composed of different
sub-applications, or components, as called in Spaghetto.

Already configured and wired for you, so you can start coding instantly :
 - [AngularJS](http://angularjs.org/) for MVC, templating, etc.
 - [AngularUI-Router](https://github.com/angular-ui/ui-router) for clear
 handling of your app states
 - [Bootstrap](http://getbootstrap.com/) for responsive components
 - [Gulp](http://gulpjs.com/) to build all
 - [Sass](http://sass-lang.com/) CSS compatible extension
 - [NgDocs](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
 to generate your app documentation
 - [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/) for code quality and style
 - and more...

But Spaghetto is not just an assemblage of well-chosen libraries, it's also a
light framework with a simple API and it provides you with the main features
you'd except in a rich webapp :
- a double [Bootstrap](http://getbootstrap.com/) navigation bar :
  - with tabs to switch from one component to another
  - each component has its own set of navigation items (drop-down menus,
  search bar, etc.)
  - responsive
- local and session storage to save app and/or user data

## How it works :

A Spaghetto component is self-contained, all files needed to build it (html
templates, js scripts and css/sass stylesheets) reside in one directory,
organized as you prefer.

You develop a component as a stand-alone webapp.

A component underlying state -made of controller(s) and view(s)- is instantiated
when the component is displayed, and destroyed when the component tab is closed.
Local/session storage take care of the component data that needs to be kept.

In one command '''gulp build''' : scripts and stylesheets are minified and concatenated : your app is built!


And the list goes on, read the extensive documentation

All is done so you don't have to worry about setup and configuration and you can
concentrate on writing your application instead

## Install

### Build the example app...
...and start from here

## [live example] : not yet...

## [Spaghetto Documentation] : not yet...

## Generate your app documentation : not yet...

# License
Spaghetto is released under the MIT License. See the [LICENSE][license] file for further details.
[license]: https://github.com/aurelien-rainone/spaghetto/blob/master/LICENSE
