import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';

const userAppRoutes: Routes = [
  {
    path: 'userapp', component: UserAppComponent,
    children: [
      { path: '', component: UserAppDataComponent }
      //{ path: 'detail/:id', component: HeroDetailComponent },
    ]
  }
  //{ path: 'auth/login', component: LoginComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(userAppRoutes)],
  exports: [RouterModule]
})
export class UserAppRoutingModule { }