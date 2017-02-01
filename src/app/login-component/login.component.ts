import { Component ,OnInit } from '@angular/core';
import {FirebaseLoginService} from '../service/firebase.login.service';

@Component({
  moduleId: 'module.id',
  selector: 'my-login',
  templateUrl:'./login.component.html',
  styleUrls:["./login.component.css"]
})
export class LoginComponent {
  user={username:'',password :''}
  get myContent() { return JSON.stringify(this.user); }
 }