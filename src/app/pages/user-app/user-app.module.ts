import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { SharedModule } from '../../shared.module';
import { ProfileComponent } from './profiles/profile.component'
import { LocationComponent } from './location-component/location.component';
import { GeneralComponent } from './location-component/general-component/general.component';
import { PotViewComponent } from './location-component/pot-view-component/pot-view.component';
import { PlayerComponent } from './location-component/player-component/player.component';
import { HandService } from './location-component/@core/hand.service';
import { BotService } from './location-component/@core/bot.service';
import { CardComponent } from './location-component/player-component/card-component/card.component';
import { PlayerDataService } from './location-component/@core/player-data.service';
import { GenericMethods } from './location-component/@core/generic-methods';

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

    GeneralComponent,
    PotViewComponent,
    PlayerComponent,
    CardComponent
  ],
  providers: [
    BotService,
    HandService,
    PlayerDataService,
    GenericMethods
  ]
})
export class UserAppModule { }
