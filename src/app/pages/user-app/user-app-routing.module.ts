import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { ProfileComponent } from './profiles/profile.component';

const userAppRoutes: Routes = [
  {
    path: '', component: UserAppComponent,
    children: [
      { path: 'UserAppDataComponent', component: UserAppDataComponent },
      // { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'UserAppDataComponent', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userAppRoutes)],
  exports: [RouterModule]
})
export class UserAppRoutingModule { }