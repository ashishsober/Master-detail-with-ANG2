import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule ,MdIconRegistry } from '@angular2-material/icon';




import { AppComponent }  from './app-component/app.component';
import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { DashboardComponent }     from './dashboard-component/dashboard.component';
import {HeroService} from './service/hero.service';

import { AppRoutingModule }  from './app-routing.module';



@NgModule({
  imports:[ BrowserModule ,
            FormsModule,
            AppRoutingModule,
            MdCardModule,
            MdButtonModule,
            MdIconModule
           
                
           ],
  declarations: [ AppComponent ,
                  HeroDetailComponent,
                  HeroesComponent,
                  DashboardComponent ],
  providers: [ HeroService ,MdIconRegistry],
  bootstrap:    [ AppComponent ]
  
})
export class AppModule { }
