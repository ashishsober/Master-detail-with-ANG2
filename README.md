# Typescript (2.6.2)

# Angular 2 Demo App (5.0.3)

## To Start the application type 

 1. ng serve
 
 1. http://localhost:4200/

* Quick links

          $ https://github.com/angular/quickstart
          $ https://angular.io/docs/ts/latest/tutorial/toh-pt3.html
          $ https://embed.plnkr.co/?show=preview

* App contains 5 components ;

          app-component 
          dashboard-component
          hero-detail-component
          heroes-component
          material-component
   

# Angular Material (2.0.0-alpha.8-2)
 
 
* [Important Link](https://github.com/angular/material2)

* After install add all the modules in system.config.js file in the map section 
shown below

        map: {
              // our app is within the app folder
               app: 'app',
              '@angular2-material/core': 'npm:@angular2-material/core/core.umd.js',
          }


and import all the modules in the app.module.ts file,do not apply forRoot() method,
if you do the refactoring then we can apply the forRoot() method as i have done.and please add providers also for radio-button and some other modules.
   


# Injected Angular-CLI  

* To inject angular cli write ng init and follow the instruction.
* start the application with ng-serve instead of npm start
* How to give the build in Angular-cli project
   
        just type the command ' ng build --prod ' it will create a dist folder in the root directory


# Created angular Forms

   [Angular form Link](https://angular.io/docs/ts/latest/guide/forms.html)


# Firebase ui-web

1. Using firebase ui for the user Identity 
              
1. [FirebaseUI-Web github](https://github.com/firebase/FirebaseUI-Web)
1. [Other related link](https://firebase.google.com/docs/auth/web/password-auth#before_you_begin)

1. Install angularFire2 and firebase

        npm install angularfire2 firebase --save

1. [Related Link](https://github.com/angular/angularfire2/blob/master/docs/3-retrieving-data-as-lists.md)


# How to deploy the application in Firebase

* First install firebase-tools
   
        $npm install -g firebase-tools

* Then Login using the Firebase-cli and initialize the project
    
        $firebase login

        $firebase init
        Select the Hosting option in the command line
         >Hosting: Configure and deploy firebase hosting site

* Deploy to Firebase Hosting
      
        $ firebase deploy
        $ If it ask for reauth, firebase login --reauth --no-localhost