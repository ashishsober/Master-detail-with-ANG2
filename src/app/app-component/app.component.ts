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
  viewLogin : boolean;
  subscription;
  
  constructor(private ss : HeroService){
    this.viewLogin = false;
    this.ss = ss;
  }
  
  ngOnInit() {
     this.subscription=this.ss.getEmittedValue().subscribe(item => {
      console.log("inside ngOnit method of app component====="+item); 
      this.viewLogin=item
    });
  }


  loginOrOut(){
    //const isAuthenticated = this.authservice.isAuthenticated;

  }



}
