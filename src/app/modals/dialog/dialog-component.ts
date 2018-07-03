import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginModalComponent } from 'app/modals/login-modal/login-modal-component';

@Component({
  template: `
    <div class ="dialogBody">
      <mat-dialog-content>
          <h2 class="mat-h2">Activation blocked for you ,Please do login</h2>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close mat-raised-button type="button" class="myButton"  (click)="redirectToLogin()">OK</button>
      </mat-dialog-actions>
    </div>
    `,
  styleUrls: ['./dialog-component.scss']
})
export class DialogComponent {
  loginDialogRef: MatDialogRef<LoginModalComponent>;
  constructor(private router: Router,
    private dialog: MatDialog) { }

  redirectToLogin() {
    //this.router.navigate(['login']);
    this.loginDialogRef = this.dialog.open(LoginModalComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '1152px',
      disableClose: true
    });
  }
}
//   <h1 mat-dialog-title>Add file</h1>