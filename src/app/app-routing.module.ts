import { NgModule }      from '@angular/core';
import { RouterModule ,Routes }   from '@angular/router';

import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { DashboardComponent }     from './dashboard-component/dashboard.component';
import { MaterialComponent }     from './material-component/material.component';
import { ObservableComponent }     from './observable-component/observable.component';

const routes: Routes = [
  { path: '', redirectTo: '/observable', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'material',   component: MaterialComponent },
  { path: 'observable',   component: ObservableComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}