#Angular 2 app

To Start the application type 

     npm start

Quick links

      $ https://github.com/angular/quickstart
      $ https://angular.io/docs/ts/latest/tutorial/toh-pt3.html
      $ https://embed.plnkr.co/?show=preview


#Angular Material (2.0.0-alpha.8-2)
 
 
[Important Link](https://github.com/angular/material2)

Install these modules npm install module_name --save ,all the modules will show up
in package.json

    "@angular2-material/button"
    "@angular2-material/button-toggle",
    "@angular2-material/card"
    "@angular2-material/checkbox"
    "@angular2-material/core"
    "@angular2-material/grid-list"
    "@angular2-material/icon"
    "@angular2-material/input"
    "@angular2-material/menu"
    "@angular2-material/progress-bar"
    "@angular2-material/progress-circle"
    "@angular2-material/radio"
    "@angular2-material/sidenav"
    "@angular2-material/slide-toggle"
    "@angular2-material/slider"
    "@angular2-material/tabs"
    "@angular2-material/toolbar"
    "@angular2-material/tooltip"

after install add all the modules in system.config.js file in the map section 
shown below

      map: {
            // our app is within the app folder
            app: 'app',
            '@angular2-material/core': 'npm:@angular2-material/core/core.umd.js',
        }

and import all the modules in the app.module.ts file,do not apply forRoot() method,
if you do the refactoring then we can apply the forRoot() method as i have done.
 and please add providers also for radio-button and some other modules.
   