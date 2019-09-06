import { Component, NgZone } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  moduleId: 'module.id',
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  user = { username: '', password: '' };
  files: {};
  get myContent() { return JSON.stringify(this.user); }

  constructor(private zone:NgZone,
    private ss: DataService,
    private router: Router,
    private matDialog: MatDialog) { }

  onSubmit() {
    console.log("my console from onSubmit" + this.user);
  }

  // googleLogin() {
  //   console.log("i m inside google Login method");
  //   this.firebase_login_service.getAuth()
  //     .then(result => {
  //       this.zone.run(() =>{
  //         this.router.navigate(['dashboard']);
  //      });
  //         sessionStorage.setItem('user_uid', result.user.uid);
  //         sessionStorage.setItem('user_photoUrl', result.user.photoURL);
  //         sessionStorage.setItem('user_emalid', result.user.email);
  //         this.ss.hide();
  //     });
  // }

  // onChange(event) {
  //   this.files = event.srcElement.files;
  //   console.log("My file and blob" + this.files[0]);
  //   this.firebase_login_service.UploadFile(this.files);
  // }

  cancel() {
    this.router.navigate(['dashboard']);
    this.matDialog.closeAll();
  }
}