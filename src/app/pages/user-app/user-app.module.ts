import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { SharedModule } from '../../shared.module';
import { ProfileComponent } from './profiles/profile.component'
;@NgModule({
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
    ProfileComponent
  ]
})
export class UserAppModule { }
