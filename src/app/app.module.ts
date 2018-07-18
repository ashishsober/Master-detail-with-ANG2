import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './components/app-component/app.component';
import { HeroDetailComponent } from './components/hero-detail-component/hero-detail.component';
import { HeroesComponent } from './components/heroes-component/heroes.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { MaterialComponent } from './components/material-component/material.component';
import { LoginComponent } from './components/login-component/login.component';
import { TodoComponent } from './components/todo-firebase-component/todo.component';
import { DataService } from './core/data.service';
import { FirebaseLoginService } from './core/firebase.login.service';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { LoginRouteGuard } from './core/login-route-guard';
import { DialogComponent } from './modals/dialog/dialog.component';
import { UserInfoModalComponent } from './modals/user-info-modal/user-info-modal.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

export const firebaseConfig = {
  apiKey: "AIzaSyBu4vtqAO8iH8Bs-Jeak50DfeqT5NgkH8E",
  authDomain: "angular-project-5cb99.firebaseapp.com",
  databaseURL: "https://angular-project-5cb99.firebaseio.com",
  storageBucket: "angular-project-5cb99.appspot.com",
  messagingSenderId: "103586939904"
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    AppRoutingModule,
    AppMaterialModule,
  ],
  declarations: [AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    MaterialComponent,
    LoginComponent,
    TodoComponent,
    DialogComponent,
    UserInfoModalComponent,
    LoginModalComponent],
  providers: [DataService, FirebaseLoginService, LoginRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, UserInfoModalComponent, LoginModalComponent]
})
export class AppModule { }
