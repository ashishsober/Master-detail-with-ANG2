import { Component, OnInit, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Router, NavigationStart } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserInfoModalComponent } from '../../modals/user-info-modal/user-info-modal.component';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'Initial C';
  login: string = 'Login';
  viewLogout: boolean;
  viewLogin: boolean;
  subscription;
  myPhotoUrl;
  fileNameDialogRef: MatDialogRef<UserInfoModalComponent>;

  constructor(private ss: DataService, private router: Router,
    private dialog: MatDialog, private renderer: Renderer2,
    private el: ElementRef) {
    let uid = sessionStorage.getItem('user_uid');
    if (uid !== null) {
      this.router.navigate(['dashboard']);
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
            this.renderer.removeClass(this.el.nativeElement.childNodes[0], 'hide-toolbar-sidebar');
            this.renderer.removeClass(this.el.nativeElement.childNodes[1].childNodes[0], 'hide-toolbar-sidebar');
            this.renderer.removeClass(this.el.nativeElement.childNodes[1].childNodes[1], 'do-the-center');
          } else if (event.url === '/auth/login' && uid === null) {
            this.renderer.addClass(this.el.nativeElement.childNodes[0], 'hide-toolbar-sidebar');
            this.renderer.addClass(this.el.nativeElement.childNodes[1].childNodes[0], 'hide-toolbar-sidebar');
            this.renderer.addClass(this.el.nativeElement.childNodes[1].childNodes[1], 'do-the-center');
          }
        }
      });
  }

  ngOnInit() {
    this.ss.getEmittedValue().subscribe(item => {
      console.log("inside ngOnit method of app component=====" + item);
      this.viewLogin = item;
      this.viewLogout = item;
      if(item){
        this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
      } 
    });
  }

  ngOnChanges(changes: SimpleChanges){
    alert("on change");
  }

  infoModal() {
    this.fileNameDialogRef = this.dialog.open(UserInfoModalComponent, {
      hasBackdrop: true,
      height: '400px',
      width: '270px',
      position: { top: '10px', right: '100px' }
    });
  }
}
