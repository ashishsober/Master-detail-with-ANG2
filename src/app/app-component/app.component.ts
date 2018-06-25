import { Component, OnInit } from '@angular/core';
//import {AuthService} from '../service/auth-service';
import { HeroService } from '../service/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FirebaseLoginService} from '../service/firebase.login.service';




@Component({
  moduleId:'module.id',
  selector: 'app-root',
  templateUrl :'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit {
      title = 'Initial C';
      signInOut :string ='Login';
      viewLogout :boolean;
      viewLogin : boolean;
      subscription;
      myPhotoUrl;


      constructor(private ss : HeroService,
                  private router:Router,
                  private firebase_login_service:FirebaseLoginService,){
              if(sessionStorage.getItem('user_uid') != null){
                this.viewLogin = true;
                this.viewLogout = true;
                this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');    
              } else {
                this.viewLogin = false;
                this.viewLogout = false;
              }
              this.ss = ss;
       }
      

      ngOnInit() {
        this.subscription=this.ss.getEmittedValue().subscribe(item => {
              console.log("inside ngOnit method of app component====="+item); 
              this.viewLogin=item;
              this.viewLogout=item;
              this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
        });
      }



      logout(){
          sessionStorage.clear();
          this.ss.show();//making visible login button and hiding logout button
           //const isAuthenticated = this.authservice.isAuthenticated;
          this.router.navigate(['login']);
          this.firebase_login_service.getLogout().then(result => {
            console.log("My Result after signout"+result);
          });
      }



}
