import { NgModule ,ModuleWithProviders}      from '@angular/core';

//import { MaterialModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule ,MatIconRegistry } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
//import { MatProgressCircleModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
//import { FlexLayoutModule} from '@angular/flex-layout';
import { MatRippleModule ,MatProgressSpinnerModule} from '@angular/material';



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
            MatProgressSpinnerModule
            
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
