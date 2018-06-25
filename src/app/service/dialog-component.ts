import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    template: `
      
      <mat-dialog-content>
          <h2 class="mat-h2">Activation blocked for you ,Please do login</h2>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="button" mat-dialog-close mat-raised-button color="warn" (click)="cancel()">Cancel</button>
      </mat-dialog-actions>
    `
  })
  export class DialogComponent {
    constructor(private router:Router){}
    cancel(){
      this.router.navigate(['login']);
    }

  }



//   <h1 mat-dialog-title>Add file</h1>