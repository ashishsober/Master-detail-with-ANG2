import { NgModule ,ModuleWithProviders}      from '@angular/core';

import { MatCardModule ,
         MatButtonModule ,
         MatIconModule ,
         MatIconRegistry ,
         MatInputModule ,
         MatCheckboxModule ,
         MatButtonToggleModule ,
         MatGridListModule ,
         MatListModule ,
         MatMenuModule ,
         MatProgressBarModule ,
         MatRadioModule ,
         MatSidenavModule ,
         MatSliderModule ,
         MatSlideToggleModule ,
         MatTabsModule ,
         MatToolbarModule ,
         MatTooltipModule ,
         MatRippleModule ,
         MatProgressSpinnerModule ,
         MatDialogModule } from '@angular/material';

         
//import { MatProgressCircleModule } from '@angular/material';
//import { FlexLayoutModule} from '@angular/flex-layout';


const MATERIAL_MODULES = [
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            MatInputModule,
            MatCheckboxModule,
            MatButtonToggleModule,
            MatGridListModule,
            MatListModule,
            MatMenuModule,
            MatProgressBarModule,
            MatRadioModule,
            MatSidenavModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            MatRippleModule,
            MatProgressSpinnerModule,
            MatDialogModule
];

@NgModule({
  imports:[ MATERIAL_MODULES ],
  exports:[ MATERIAL_MODULES ] ,
  providers: [ MatIconRegistry],
   
})
export class AppMaterialModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppMaterialModule
    };
 }
}
