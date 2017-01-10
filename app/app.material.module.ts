import { NgModule ,ModuleWithProviders}      from '@angular/core';

//import { MaterialModule } from '@angular/material';
import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule ,MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdListModule } from '@angular2-material/list';
import { MdMenuModule } from '@angular2-material/menu';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdSliderModule } from '@angular2-material/slider';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';

import {
        MdRippleModule,
        RtlModule,
        PortalModule,
        OverlayModule ,
        MdUniqueSelectionDispatcher} from '@angular2-material/core';



const MATERIAL_MODULES = [
            MdCardModule,
            MdButtonModule,
            MdIconModule,
            MdInputModule,
            MdCheckboxModule,
            MdButtonToggleModule,
            MdGridListModule,
            MdListModule,
            MdMenuModule,
            MdProgressBarModule,
            MdProgressCircleModule,
            MdRadioModule,
            MdSidenavModule,
            MdSliderModule,
            MdSlideToggleModule,
            MdTabsModule,
            MdToolbarModule,
            MdTooltipModule,

            MdRippleModule,
            OverlayModule,
            PortalModule,
            RtlModule
            
];

@NgModule({
  imports:[ MATERIAL_MODULES ],
  exports:[ MATERIAL_MODULES ] ,
  providers: [ MdIconRegistry ,MdUniqueSelectionDispatcher],
   
})
export class AppMaterialModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppMaterialModule
    };
 }
}
