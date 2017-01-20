import { NgModule }      from '@angular/core';
import { RouterModule ,Routes }   from '@angular/router';

import { HeroesComponent }     from './heroes-component/heroes.component';
import { ObservableComponent }     from './observable-component/observable.component';

const routes: Routes = [
  { path: '', redirectTo: '/observable', pathMatch: 'full' },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'observable',   component: ObservableComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}