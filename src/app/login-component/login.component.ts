import { Component ,OnInit,Input } from '@angular/core';
import {FirebaseLoginService} from '../service/firebase.login.service';

@Component({
  moduleId: 'module.id',
  selector: 'my-login',
  templateUrl:'./login.component.html',
  styleUrls:["./login.component.css"]
})
export class LoginComponent {
  user={username:'',password :''};
  myPhotoUrl:string;
  get myContent() { return JSON.stringify(this.user); }
  
  constructor(private firebase_login_service:FirebaseLoginService) {}
  
  onSubmit() {
    console.log("my console" +this.user);
  }


  googleLogin() {
    console.log("i m inside google Login method");
    this.firebase_login_service.getAuth()
                               .then(result => this.myPhotoUrl = result.user.photoURL);
  }
 }