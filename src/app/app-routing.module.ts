import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HeroDetailComponent } from './pages/components/hero-detail-component/hero-detail.component';
import { HeroesComponent } from './pages/components/heroes-component/heroes.component';
import { DashboardComponent } from './pages/components/dashboard-component/dashboard.component';
import { ApplicantFieldComponent } from './pages/components/applicant-form-component/applicant-field.component';
import { LoginComponent } from './pages/components/login-component/login.component';
import { TodoComponent } from './pages/components/todo-firebase-component/todo.component';
import { LoginRouteGuard } from './core/login-route-guard';
import { ShellComponent } from './pages/components/shell-component/shell.component';
const routes: Routes = [

  {
    path: '', component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detail/:id', component: HeroDetailComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'basic-information', component: ApplicantFieldComponent },
      { path: 'todoFirebase', component: TodoComponent, canActivate: [LoginRouteGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'userapp', loadChildren: 'app/pages/user-app/user-app.module#UserAppModule' },
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }


];
// const config: ExtraOptions = {
//   useHash: true,
// };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }