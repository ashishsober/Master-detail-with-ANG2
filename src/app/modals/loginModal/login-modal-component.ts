import { Component, OnInit, Input } from '@angular/core';
import { FirebaseLoginService } from '../../service/firebase.login.service';
import { HeroService } from '../../service/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
    templateUrl: './login-modal-component.html',
    styleUrls: ['./login-modal-component.css']
})
export class LoginModalComponent {
    constructor(private firebase_login_service: FirebaseLoginService,
        private ss: HeroService,
        private router: Router,
        private matDialog: MatDialog) {
        this.ss = ss;
    }
    googleLogin() {
        console.log("i m inside google Login method");
        this.firebase_login_service.getAuth()
            .then(result => {
                //this.myPhotoUrl = result.user;
                //this.myPhotoUrlValue=false;
                console.log("saved user uuid in session===" + result.user.uid);
                sessionStorage.setItem('user_uid', result.user.uid);
                sessionStorage.setItem('user_photoUrl', result.user.photoURL);
                sessionStorage.setItem('user_emalid', result.user.email);
                this.ss.hide();
                this.router.navigate(['dashboard']);
                this.matDialog.closeAll();
            });
    }
    cancel() {
        this.router.navigate(['dashboard']);
        this.matDialog.closeAll();
    }
}
//   <h1 mat-dialog-title>Add file</h1>