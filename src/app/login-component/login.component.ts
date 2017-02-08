import { Component ,OnInit,Input } from '@angular/core';
import {FirebaseLoginService} from '../service/firebase.login.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  moduleId: 'module.id',
  selector: 'my-login',
  templateUrl:'./login.component.html',
  styleUrls:["./login.component.css"]
})
export class LoginComponent {
  user={username:'',password :''};
  myPhotoUrl:string;
  textMessage:string;
  get myContent() { return JSON.stringify(this.user); }
  items: FirebaseListObservable<any[]>;
  
  constructor(af: AngularFire ,
              private firebase_login_service:FirebaseLoginService) { 
    this.items=af.database.list('/messages');
}
  
  myMessage(textMessage: string){
    //console.log(this.textMessage);
    this.items.push(textMessage);
    this.textMessage='';
  }

  onSubmit() {
    //console.log("my console" +this.user);
    this.firebase_login_service.getAuth()
                               .then(result => this.myPhotoUrl = result.user.photoURL);
    
   
    
  }
 }