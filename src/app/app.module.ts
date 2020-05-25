import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './pages/components/hero-detail-component/hero-detail.component';
import { HeroesComponent } from './pages/components/heroes-component/heroes.component';
import { DashboardComponent } from './pages/components/dashboard-component/dashboard.component';
import { ApplicantFieldComponent } from './pages/components/applicant-form-component/applicant-field.component';
import { LoginComponent } from './pages/components/login-component/login.component';
import { TodoComponent } from './pages/components/todo-firebase-component/todo.component';
import { DataService } from './core/data.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginRouteGuard } from './core/login-route-guard';
import { AlertDialogComponent } from './modals/dialog/alert-dialog.component';
import { UserInfoModalComponent } from './modals/user-info-modal/user-info-modal.component';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { SelectBox } from './@themes/components/select-box/select-box.component';
import { ShellComponent } from './pages/components/shell-component/shell.component';
import { SharedModule } from './shared.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,/* no need to inject in shared module */
    SharedModule,
    AppRoutingModule,
  ],
  exports: [],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    ApplicantFieldComponent,
    LoginComponent,
    TodoComponent,
    AlertDialogComponent,
    UserInfoModalComponent,
    SelectBox,
    ShellComponent
  ],
  providers: [DataService, LoginRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent, UserInfoModalComponent]
})
export class AppModule { }
