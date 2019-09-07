import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { SharedModule } from '../../shared.module';
import { ProfileComponent } from './profiles/profile.component'
import { TableComponent } from './poker-table-component/table.component';
import { GeneralComponent } from './poker-table-component/general-component/general.component';
import { PotViewComponent } from './poker-table-component/pot-view-component/pot-view.component';
import { PlayerComponent } from './poker-table-component/player-component/player.component';
import { HandService } from './poker-table-component/@core/hand.service';
import { BotService } from './poker-table-component/@core/bot.service';
import { CardComponent } from './poker-table-component/player-component/card-component/card.component';
import { PlayerDataService } from './poker-table-component/@core/player-data.service';
import { GenericMethods } from './poker-table-component/@core/generic-methods';

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
    TableComponent,

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
