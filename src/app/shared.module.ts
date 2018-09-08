import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './@themes/components/header/header.component';
import { AppMaterialModule } from './app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpModule,
        AppMaterialModule
        ],
    declarations: [],
    providers: [],//services to inject
    exports: [AppMaterialModule]
 })
 export class SharedModule {  }