import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl:'./alert-dialog.component.html' ,
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit{
  responseStatus:string;
  responseAction:string;
  message:string;
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public appData: any) { 
  }

  ngOnInit(){
    console.log(this.appData);
    this.responseStatus = this.appData.application.response_type.toUpperCase();//info,hard
    this.responseAction = this.appData.application.response_action.toUpperCase();//contibue stop..
    this.message = this.appData.application.message;
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
  
  redirectToBasicInfo(){
    this.router.navigate(['basic-information']);
  }
}