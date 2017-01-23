import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule} from '@angular/http';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

//import { AppComponent } from './app.component';
import { AppComponent }  from './app-component/app.component';
import { HeroesComponent }     from './heroes-component/heroes.component';
import { ObservableComponent }     from './observable-component/observable.component';
import { HeroService } from './service/hero.service';
import { WikipediaService } from './service/wiki.service';

import { AppRoutingModule }  from './app-routing.module';
import { AppMaterialModule }  from './app.material.module';

@NgModule({
  imports: [
              BrowserModule,
              FormsModule,
              HttpModule,
              JsonpModule,
              FlexLayoutModule,
              

              AppRoutingModule,
              AppMaterialModule,
             ],
  declarations: [ AppComponent ,
                  HeroesComponent,
                  ObservableComponent],
  providers: [HeroService,WikipediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
