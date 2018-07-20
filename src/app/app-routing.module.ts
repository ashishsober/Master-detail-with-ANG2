import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail-component/hero-detail.component';
import { HeroesComponent } from './components/heroes-component/heroes.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { ApplicantFieldComponent } from './components/applicant-form-component/applicant-field.component';
import { LoginComponent } from './components/login-component/login.component';
import { TodoComponent } from './components/todo-firebase-component/todo.component';
import { LoginRouteGuard } from './core/login-route-guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'basic-information', component: ApplicantFieldComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'todoFirebase', component: TodoComponent, canActivate: [LoginRouteGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }