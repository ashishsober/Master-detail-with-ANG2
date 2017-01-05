import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';



import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { DashboardComponent }     from './dashboard-component/dashboard.component';
import {HeroService} from './service/hero.service';



@NgModule({
  imports:[ BrowserModule ,
            FormsModule ,
            RouterModule.forRoot([
                                  {
                                    path: 'heroes',
                                    component: HeroesComponent
                                   },
                                   {
                                      path: 'dashboard',
                                      component: DashboardComponent
                                    },

                                  ])
           ],
  declarations: [ AppComponent ,HeroDetailComponent,HeroesComponent,DashboardComponent ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ]
  
})
export class AppModule { }
