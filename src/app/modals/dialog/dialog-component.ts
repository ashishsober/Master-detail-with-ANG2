import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  template: `
    <div class ="dialogBody">
      <mat-dialog-content>
          <h2 class="mat-h2">Activation blocked for you ,Please do login</h2>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close mat-raised-button type="button" class="myButton"  (click)="cancel()">OK</button>
      </mat-dialog-actions>
    </div>
    `,
  styleUrls: ['./dialog-component.css']
})
export class DialogComponent {
  constructor(private router: Router) { }
  cancel() {
    this.router.navigate(['login']);
  }
}



//   <h1 mat-dialog-title>Add file</h1>