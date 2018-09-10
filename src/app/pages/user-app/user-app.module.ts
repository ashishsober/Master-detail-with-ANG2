import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { SharedModule } from '../../shared.module';
import { ProfileComponent } from './profiles/profile.component'
import { LocationComponent } from './location-component/location.component';
import { BoardComponent } from './location-component/board-component/board.component';
import { BoardMessageComponent } from './location-component/board-message/board-message.component';
import { GeneralComponent } from './location-component/general-component/general.component';
import { PotViewComponent } from './location-component/pot-view-component/pot-view.component';
import { PlayerComponent } from './location-component/player-component/player.component'
import { HandComponent } from './location-component/@core/hand.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserAppRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    UserAppComponent,
    UserAppDataComponent,
    ProfileComponent,
    LocationComponent,

    BoardComponent,
    BoardMessageComponent,
    GeneralComponent,
    PotViewComponent,
    PlayerComponent,
    HandComponent
  ]
})
export class UserAppModule { }
