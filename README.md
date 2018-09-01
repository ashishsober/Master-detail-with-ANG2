# Typescript (2.7.2)

# Angular 6 Demo App (6.0.7)

## To Start the application type 

 1. ng serve
 
 1. http://localhost:4200/

* Quick links

          $ https://github.com/angular/quickstart
          $ https://angular.io/docs/ts/latest/tutorial/toh-pt3.html
          $ https://embed.plnkr.co/?show=preview
          $ https://medium.mybridge.co/18-amazing-open-source-angular-projects-dd9e81d921ee

## Angular Material (2.0.0-alpha.8-2)
 
 
* [Important Link](https://github.com/angular/material2)

* Import all the modules in the app.module.ts file,do not apply forRoot() method,
if you do the refactoring then we can apply the forRoot() method as i have done.and please add providers also for radio-button and some other modules.

* for Grid system using Bootstrap layout 
   


### Injected Angular-CLI  

* To inject angular cli write ng init and follow the instruction.
* start the application with ng-serve instead of npm start
* How to give the build in Angular-cli project
   
        just type the command ' ng build --prod ' it will create a dist folder in the root directory


### Created angular Forms

   [Angular form Link](https://angular.io/docs/ts/latest/guide/forms.html)


### Firebase UI-WEB

1. Using firebase ui for the user Identity 
              
1. [FirebaseUI-Web github](https://github.com/firebase/FirebaseUI-Web)
1. [Other related link](https://firebase.google.com/docs/auth/web/password-auth#before_you_begin)

1. Install angularFire2 and firebase

        npm install angularfire2 firebase --save

1. [Related Link](https://github.com/angular/angularfire2/blob/master/docs/3-retrieving-data-as-lists.md)



### How to deploy the application in Firebase

* First install firebase-tools globally
   
        $npm install -g firebase-tools

* Then Login using the Firebase-cli and initialize the project
    
        $firebase login

        $firebase init
        Select the Hosting option in the command line
         >Hosting: Configure and deploy firebase hosting site

* Deploy to Firebase Hosting
      
        $ firebase deploy
        $ If it ask for reauth, firebase login --reauth --no-localhost


### Using Google Analytics to track and reports website traffic



1. [Google Analytics](https://analytics.google.com/)

1. [Tag Manager](https://tagmanager.google.com/)


#### How to update the package.json

    $ npm install -g npm-check-updates
    $ npm-check-updates -u  u will come to know which are the modules or library got updated
    $ npm install  or ncu -a to update the package.json
    $ `npm i webpack --save-dev`
