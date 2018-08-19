import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl:'./alert-dialog.component.html' ,
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }
  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}