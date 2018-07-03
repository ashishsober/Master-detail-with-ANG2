import { Component, OnInit } from '@angular/core';
//import {AuthService} from '../service/auth-service';
import { HeroService } from '../../service/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseLoginService } from '../../service/firebase.login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InfoModalComponent } from 'app/modals/infoModal/info-modal-component';
import { LoginModalComponent } from 'app/modals/loginModal/login-modal-component';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Initial C';
  login: string = 'Login';
  viewLogout: boolean;
  viewLogin: boolean;
  subscription;
  myPhotoUrl;
  fileNameDialogRef: MatDialogRef<InfoModalComponent>;
  loginDialogRef: MatDialogRef<LoginModalComponent>;
  constructor(private ss: HeroService,
    private router: Router,
    private firebase_login_service: FirebaseLoginService,
    private dialog: MatDialog) {

    if (sessionStorage.getItem('user_uid') != null) {
      this.viewLogin = true;
      this.viewLogout = true;
      this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
    } else {
      this.viewLogin = false;
      this.viewLogout = false;
    }
    this.ss = ss;
  }

  ngOnInit() {
    this.subscription = this.ss.getEmittedValue().subscribe(item => {
      console.log("inside ngOnit method of app component=====" + item);
      this.viewLogin = item;
      this.viewLogout = item;
      this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
    });
  }

  infoModal() {
    this.fileNameDialogRef = this.dialog.open(InfoModalComponent, {
      hasBackdrop: true,
      height: '400px',
      width: '270px',
      position: { top: '10px', right: '100px' }
    });
  }

  openLoginModal() {
    this.loginDialogRef = this.dialog.open(LoginModalComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '1152px',
      disableClose: true
    });
  }

}
