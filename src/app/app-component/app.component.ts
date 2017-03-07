import { Component } from '@angular/core';
//import {AuthService} from '../service/auth-service';
@Component({
  moduleId:'module.id',
  selector: 'app-root',
  templateUrl :'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  signInOut :string ='Login';

  constructor(){}
  loginOrOut(){
    //const isAuthenticated = this.authservice.isAuthenticated;

  }
}
