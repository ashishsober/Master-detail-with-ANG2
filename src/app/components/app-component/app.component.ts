import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FirebaseLoginService } from '../../core/firebase.login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserInfoModalComponent } from '../../modals/user-info-modal/user-info-modal.component';
import { LoginModalComponent } from '../../modals/login-modal/login-modal.component';

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
  fileNameDialogRef: MatDialogRef<UserInfoModalComponent>;
  loginDialogRef: MatDialogRef<LoginModalComponent>;
  boolValue = false;
  previousUrl: string;

  constructor(private ss: DataService, private router: Router,
    private firebase_login_service: FirebaseLoginService,
    private dialog: MatDialog, private renderer: Renderer2,
    private el: ElementRef) {
    if (sessionStorage.getItem('user_uid') != null) {
      this.viewLogin = true;
      this.viewLogout = true;
      this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
    } else {
      this.viewLogin = false;
      this.viewLogout = false;
    }
    this.ss = ss;

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (event.url.slice(1) === 'dashboard') {
            this.renderer.removeClass(this.el.nativeElement.childNodes[0],'hide-toolbar-sidebar');
            this.renderer.removeClass(this.el.nativeElement.childNodes[1].childNodes[0],'hide-toolbar-sidebar');
            this.renderer.removeClass(this.el.nativeElement.childNodes[1].childNodes[1],'do-the-center');
          } else if(event.url === '/auth/login') {
            this.renderer.addClass(this.el.nativeElement.childNodes[0],'hide-toolbar-sidebar');
            this.renderer.addClass(this.el.nativeElement.childNodes[1].childNodes[0],'hide-toolbar-sidebar');
            this.renderer.addClass(this.el.nativeElement.childNodes[1].childNodes[1],'do-the-center');
          }
        }

      });
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
    this.fileNameDialogRef = this.dialog.open(UserInfoModalComponent, {
      hasBackdrop: true,
      height: '400px',
      width: '270px',
      position: { top: '10px', right: '100px' }
    });
  }

  openLoginModal() {
    this.router.navigate(['auth/login']);
    this.boolValue = true;
    // this.loginDialogRef = this.dialog.open(LoginModalComponent, {
    //   hasBackdrop: true,
    //   height: '600px',
    //   width: '1152px',
    //   disableClose: true
    // });
  }


}
