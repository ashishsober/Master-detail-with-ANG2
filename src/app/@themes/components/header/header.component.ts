import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Router, NavigationStart } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserInfoModalComponent } from '../../../modals/user-info-modal/user-info-modal.component';

@Component({
  moduleId: 'module.id',
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Initial C';
  login: string = 'Login';
  viewLogout: boolean;
  viewLogin: boolean;
  subscription;
  myPhotoUrl;
  fileNameDialogRef: MatDialogRef<UserInfoModalComponent>;
  constructor(private ss: DataService, private router: Router,
    private dialog: MatDialog) {
    let uid = sessionStorage.getItem('user_uid');
    if (uid !== null) {
      //this.router.navigate(['shell']);
      this.viewLogin = true;
      this.viewLogout = true;
      this.myPhotoUrl = sessionStorage.getItem('user_photoUrl');
    } else {
      this.viewLogin = false;
      this.viewLogout = false;
    }
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

  infoModal() {
    this.fileNameDialogRef = this.dialog.open(UserInfoModalComponent, {
      hasBackdrop: true,
      height: '400px',
      width: '270px',
      position: { top: '10px', right: '100px' }
    });
  }

}
