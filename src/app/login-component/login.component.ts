import { Component ,OnInit,Input } from '@angular/core';
import {FirebaseLoginService} from '../service/firebase.login.service';
import { HeroService } from '../service/hero.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: 'module.id',
  selector: 'my-login',
  templateUrl:'./login.component.html',
  styleUrls:["./login.component.css"]
})
export class LoginComponent {
  user = { username: '', password : ''};
  //myPhotoUrl;
  //myPhotoUrlValue :boolean = true;
  files:{};
  get myContent() { return JSON.stringify(this.user); }
  
  constructor(private firebase_login_service:FirebaseLoginService,
              private ss:HeroService,
              private router:Router) {
              this.ss=ss;
             }
  
  onSubmit() {
    console.log("my console from onSubmit" +this.user);
  }

  
  googleLogin() {
    console.log("i m inside google Login method");
    this.firebase_login_service.getAuth()
                               .then(result => {
                                   //this.myPhotoUrl = result.user;
                                   //this.myPhotoUrlValue=false;
                                   console.log("saved user uuid in session===" +result.user.uid);
                                   sessionStorage.setItem('user_uid',result.user.uid);
                                   sessionStorage.setItem('user_photoUrl',result.user.photoURL);
                                   sessionStorage.setItem('user_emalid',result.user.email);
                                   this.ss.hide();
                                   this.router.navigate(['dashboard']);
                                });
  }

  onChange(event){
    //console.log(event);
    this.files = event.srcElement.files;
    console.log("My file and blob" + this.files[0]);
    this.firebase_login_service.UploadFile(this.files);
   }

 }