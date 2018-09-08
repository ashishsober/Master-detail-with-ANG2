import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAppComponent } from './user-app.component';
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppDataComponent } from './user-app-data/user-app-data.component';
import { AppMaterialModule } from '../../app.material.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    UserAppRoutingModule,
    SharedModule
  ],
  declarations: [UserAppComponent,UserAppDataComponent
  ]
})
export class UserAppModule { }
