import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../service/hero.service';
import { FirebaseLoginService } from '../../service/firebase.login.service';
@Component({
  template: `
      <mat-dialog-content>
          <h2 class="mat-h2"></h2>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="button" mat-dialog-close mat-raised-button color="warn" (click)="logout()">Logout</button>
      </mat-dialog-actions>
    `
})
export class InfoModalComponent {
  constructor(private router: Router,
    private firebase_login_service: FirebaseLoginService,
    private ss: HeroService) { }
  logout() {
    sessionStorage.clear();
    this.ss.show();//making visible login button and hiding logout button
    this.router.navigate(['login']);
    this.firebase_login_service.getLogout().then(result => {
      console.log("My Result after signout" + result);
    });
  }
}



//   <h1 mat-dialog-title>Add file</h1>