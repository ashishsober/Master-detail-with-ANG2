import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';


@NgModule({
  imports: [
    CommonModule,
    UserAppRoutingModule,
  ],
  declarations: [UserAppComponent,UserAppDataComponent
  ]
})
export class UserAppModule { }
