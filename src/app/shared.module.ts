import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './@themes/components/header/header.component';
import { AppMaterialModule } from './app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { SidebarComponent } from './@themes/components/sidebar/sidebar.component';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpModule,
        AppMaterialModule,
    ],
    exports: [
        AppMaterialModule,
        HeaderComponent
    ],
    declarations: [HeaderComponent],
    providers: []//services to inject
})
export class SharedModule { }