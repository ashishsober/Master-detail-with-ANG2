import { Component, OnInit } from '@angular/core';
//import {AuthService} from '../service/auth-service';
import { HeroService } from '../service/hero.service';



@Component({
  moduleId:'module.id',
  selector: 'app-root',
  templateUrl :'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit {
      title = 'Tour of Heroes';
      signInOut :string ='Login';
      viewLogout :boolean;
      viewLogin : boolean;
      subscription;
      myPhotoUrl;


      constructor(private ss : HeroService){
        this.viewLogin = false;
        this.viewLogout = false;
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


      loginOrOut(){
        //const isAuthenticated = this.authservice.isAuthenticated;
      }



}
