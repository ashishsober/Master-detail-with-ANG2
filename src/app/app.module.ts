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
import { FirebaseLoginService } from './core/firebase.login.service';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { LoginRouteGuard } from './core/login-route-guard';
import { AlertDialogComponent } from './modals/dialog/alert-dialog.component';
import { UserInfoModalComponent } from './modals/user-info-modal/user-info-modal.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { SelectBox } from './@themes/components/select-box/select-box.component';
import { ShellComponent } from './pages/components/shell-component/shell.component';
import { HeaderComponent } from './@themes/components/header/header.component';
import { SidebarComponent } from './@themes/components/sidebar/sidebar.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBu4vtqAO8iH8Bs-Jeak50DfeqT5NgkH8E",
  authDomain: "angular-project-5cb99.firebaseapp.com",
  databaseURL: "https://angular-project-5cb99.firebaseio.com",
  storageBucket: "angular-project-5cb99.appspot.com",
  messagingSenderId: "103586939904"
};

@NgModule({
  declarations: [AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    ApplicantFieldComponent,
    LoginComponent,
    TodoComponent,
    AlertDialogComponent,
    UserInfoModalComponent,
    SelectBox,
    ShellComponent,
    HeaderComponent,
    SidebarComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
      FlexLayoutModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AppMaterialModule,
      AppRoutingModule
    ],
  providers: [DataService, FirebaseLoginService, LoginRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent, UserInfoModalComponent]
})
export class AppModule { }
