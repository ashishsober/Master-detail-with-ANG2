import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl:'./alert-dialog.component.html' ,
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  responseStatus:string;
  responseAction:string;
  message:string;
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public appData: any) { 
    console.log(appData);
    this.responseStatus = appData.application.response_type.toUpperCase();//info,hard
    this.responseAction = appData.application.response_action.toUpperCase();//contibue stop..
    this.message = appData.application.message;

  }
  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}