import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { FirebaseLoginService } from '../../core/firebase.login.service';
import { MatDialog } from '@angular/material';
@Component({
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],

})
export class UserInfoModalComponent {
  constructor(private router: Router,
    private firebase_login_service: FirebaseLoginService,
    private ss: DataService, private matDialog: MatDialog) { }
  logout() {
    sessionStorage.clear();
    this.ss.show();//making visible login button and hiding logout button
    this.matDialog.closeAll();
    this.router.navigate(['login']);
    this.firebase_login_service.getLogout().then(result => {
      console.log("My Result after signout" + result);
    });
  }
}