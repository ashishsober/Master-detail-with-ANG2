import { NgModule ,ModuleWithProviders}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent }  from './app-component/app.component';
import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { DashboardComponent }     from './dashboard-component/dashboard.component';
import {HeroService} from './service/hero.service';

import { AppRoutingModule }  from './app-routing.module';
import { AppMaterialModule }  from './app.material.module';


@NgModule({
  imports:[ BrowserModule ,
            FormsModule,
            AppRoutingModule,
            AppMaterialModule,
            FlexLayoutModule
           
           ],
  
  declarations: [ AppComponent ,
                  HeroDetailComponent,
                  HeroesComponent,
                  DashboardComponent ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ]
  
})
export class AppModule {

}
