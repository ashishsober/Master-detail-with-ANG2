import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AppComponent } from './components/app-component/app.component';
import { HeroDetailComponent } from './components/hero-detail-component/hero-detail.component';
import { HeroesComponent } from './components/heroes-component/heroes.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { MaterialComponent } from './components/material-component/material.component';
import { LoginComponent } from './components/login-component/login.component';
import { TodoComponent } from './components/todo-firebase-component/todo.component';
import { HeroService } from './service/hero.service';
import { FirebaseLoginService } from './service/firebase.login.service';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { LoginRouteGuard } from './service/login-route-guard';
import { DialogComponent } from 'app/modals/dialog/dialog-component';
import { InfoModalComponent } from 'app/modals/infoModal/info-modal-component';

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
    InfoModalComponent],
  providers: [HeroService, FirebaseLoginService, LoginRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, InfoModalComponent]
})
export class AppModule { }
