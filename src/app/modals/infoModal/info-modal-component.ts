import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../service/hero.service';
import { FirebaseLoginService } from '../../service/firebase.login.service';
@Component({
  templateUrl: './info-modal-component.html',
  styleUrls: ['./info-modal-component.scss'],

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