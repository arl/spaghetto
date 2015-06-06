<p align="center">
  <a href="https://github.com/aurelien-rainone/spaghetto">
    <img src="https://raw.githubusercontent.com/aurelien-rainone/artwork/master/spaghetto-l.png">
  </a>
</p>


# Easily build modular single page webapps

* [What is Spaghetto?](#what-is-spaghetto)
* [How it Works?](#how-it-works)
* [Install](#install)
  * [Build the Example App...](#build-the-example-app)
* [Live Example : not yet...](#live-example--not-yet)
* [Spaghetto Documentation : not yet...](#spaghetto-documentation--not-yet)
* [Generate your App Documentation : not yet...](#generate-your-app-documentation--not-yet)
* [License](#license)



## What is Spaghetto?

Besides being the italian singular for spaghetti, Spaghetto is a framework that
lets you build rich client-side applications composed of different
sub-applications, or components, as called in Spaghetto.

Already configured and wired for you, so you can start coding instantly :
 - [AngularJS](http://angularjs.org/) for MVC, templating, and a lot more...
 - [AngularUI-Router](https://github.com/angular-ui/ui-router) for clear
 handling of your app states
 - [Bootstrap](http://getbootstrap.com/) for responsive components
 - [Gulp](http://gulpjs.com/) to build all
 - [Sass](http://sass-lang.com/) CSS compatible extension
 - [NgDocs](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
 to generate your app documentation
 - [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/) for code quality and style
 - and more...

But Spaghetto is not just an assemblage of well-chosen libraries, it's also a
light framework with a simple API and comes to you with the main features
you'd except in a rich webapp :
- a double [Bootstrap](http://getbootstrap.com/) navigation bar :
  - with tabs to switch from one component to another
  - each component has its own set of navigation items (drop-down menus,
  search bar, etc.)
  - responsive
- local and session storage to save app and/or user data

## How it Works?

2 ways to use Spaghetto : 
  - use yeoman generator-spaghetto to have just the needed, opimized files and
build-process: not available yet ;-)
  - or, clone/fork this repository and start to hack

Anything you choose, spaghetto comes with an example component .

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

  - install NodeJS
  - install Spaghetto global dependencies :  
  ```npm install -g bower gulp```
  - clone repository :  
  ```git clone
  https://github.com/aurelien-rainone/spaghetto```
  - change to spaghetto directory :  
  ```cd spaghetto```
  - install Spaghetto local dependencies :  
  ```npm install```  
  this should install npm **and** bower packages, but in case it would't you can type ```bower install```  

#### Serve the Example App...

  Once all is installed, type ```gulp serve-dev``` to serve the  spaghetto example app

#### Build the example app####

  Now ```gulp build``` will create a production build of the app in /build folder. Scripts and stylesheets are all concatenated and minified, images are compressed, etc.

  Serve the production build by typing ```gulp serve-build``` or just serve the /build folder using your preferred server

## Live Example : not yet...

## Spaghetto Documentation : not yet...

## Generate your App Documentation : not yet...

## License
Spaghetto is released under the MIT License. See the [LICENSE][license] file for further details.
[license]: https://github.com/aurelien-rainone/spaghetto/blob/master/LICENSE
