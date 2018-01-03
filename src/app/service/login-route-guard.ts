import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { FirebaseLoginService } from './firebase.login.service';


@Injectable()
export class LoginRouteGuard implements CanActivate {
    
    constructor(private firebaseLoginService:FirebaseLoginService){}

    canActivate(){
        let uid = sessionStorage.getItem('user_uid');
        //console.log("user uid----",uid);
        if(uid != null)
          return true;
        else {
            alert('Activation blocked,Please do login');
            return false;
        }  
       
    }
}