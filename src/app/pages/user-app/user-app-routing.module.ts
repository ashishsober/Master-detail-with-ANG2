import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { UserDataTableComponent } from './user-data-table/user-data-table.component';

const userAppRoutes: Routes = [
  {
    path: 'userapp', component: UserAppComponent,
    children: [
      { path: '', component: UserDataTableComponent }
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