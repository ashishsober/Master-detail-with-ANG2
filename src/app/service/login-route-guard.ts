import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { FirebaseLoginService } from './firebase.login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from 'app/service/dialog-component';
@Injectable()
export class LoginRouteGuard implements CanActivate {
    fileNameDialogRef:MatDialogRef<DialogComponent>;
    constructor(private firebaseLoginService:FirebaseLoginService,
                private dialog:MatDialog){}

    canActivate(){
        let uid = sessionStorage.getItem('user_uid');
        if(uid != null)
          return true;
        else {
            this.fileNameDialogRef = this.dialog.open(DialogComponent,{
                                                                      hasBackdrop:true ,
                                                                      height: '150px',
                                                                      width: '600px'
                                                                      });
            return false;
        }  
       
    }
}