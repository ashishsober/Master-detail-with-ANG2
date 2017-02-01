import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

//import { AppComponent } from './app.component';
import { AppComponent }  from './app-component/app.component';
import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { DashboardComponent }     from './dashboard-component/dashboard.component';
import { MaterialComponent }     from './material-component/material.component';
import { LoginComponent }     from './login-component/login.component';
import {HeroService} from './service/hero.service';
import {FirebaseLoginService} from './service/firebase.login.service';

import { AppRoutingModule }  from './app-routing.module';
import { AppMaterialModule }  from './app.material.module';

@NgModule({
  imports: [
              BrowserModule,
              FormsModule,
              HttpModule,
              FlexLayoutModule,
              

              AppRoutingModule,
              AppMaterialModule,
             ],
  declarations: [ AppComponent ,
                  HeroDetailComponent,
                  HeroesComponent,
                  DashboardComponent,
                  MaterialComponent ,
                  LoginComponent],
  providers: [HeroService , FirebaseLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
