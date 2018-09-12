import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { ProfileComponent } from './profiles/profile.component';
import { LocationComponent } from './location-component/location.component';
import { BoardComponent } from './location-component/board-component/board.component';
import { BoardMessageComponent } from './location-component/board-message/board-message.component';
import { GeneralComponent } from './location-component/general-component/general.component';
import { PotViewComponent } from './location-component/pot-view-component/pot-view.component';
import { PlayerComponent } from './location-component/player-component/player.component';
const userAppRoutes: Routes = [
  {
    path: '', component: UserAppComponent,/** router outlet is here */
    children: [
      {
        path: 'UserAppDataComponent', component: UserAppDataComponent,/** router outlet is here */
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'location', component: LocationComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: '**', redirectTo: 'profile', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'UserAppDataComponent', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userAppRoutes)],
  exports: [RouterModule]
})
export class UserAppRoutingModule { }