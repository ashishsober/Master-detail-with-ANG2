"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { MaterialModule } from '@angular/material';
var card_1 = require('@angular2-material/card');
var button_1 = require('@angular2-material/button');
var icon_1 = require('@angular2-material/icon');
var input_1 = require('@angular2-material/input');
var checkbox_1 = require('@angular2-material/checkbox');
var button_toggle_1 = require('@angular2-material/button-toggle');
var grid_list_1 = require('@angular2-material/grid-list');
var list_1 = require('@angular2-material/list');
var menu_1 = require('@angular2-material/menu');
var progress_bar_1 = require('@angular2-material/progress-bar');
var progress_circle_1 = require('@angular2-material/progress-circle');
var radio_1 = require('@angular2-material/radio');
var sidenav_1 = require('@angular2-material/sidenav');
var slider_1 = require('@angular2-material/slider');
var slide_toggle_1 = require('@angular2-material/slide-toggle');
var tabs_1 = require('@angular2-material/tabs');
var toolbar_1 = require('@angular2-material/toolbar');
var tooltip_1 = require('@angular2-material/tooltip');
//import { FlexLayoutModule} from '@angular/flex-layout';
var core_2 = require('@angular2-material/core');
var MATERIAL_MODULES = [
    card_1.MdCardModule,
    button_1.MdButtonModule,
    icon_1.MdIconModule,
    input_1.MdInputModule,
    checkbox_1.MdCheckboxModule,
    button_toggle_1.MdButtonToggleModule,
    grid_list_1.MdGridListModule,
    list_1.MdListModule,
    menu_1.MdMenuModule,
    progress_bar_1.MdProgressBarModule,
    progress_circle_1.MdProgressCircleModule,
    radio_1.MdRadioModule,
    sidenav_1.MdSidenavModule,
    slider_1.MdSliderModule,
    slide_toggle_1.MdSlideToggleModule,
    tabs_1.MdTabsModule,
    toolbar_1.MdToolbarModule,
    tooltip_1.MdTooltipModule,
    core_2.MdRippleModule,
    core_2.OverlayModule,
    core_2.PortalModule,
    core_2.RtlModule
];
var AppMaterialModule = (function () {
    function AppMaterialModule() {
    }
    AppMaterialModule.forRoot = function () {
        return {
            ngModule: AppMaterialModule
        };
    };
    AppMaterialModule = __decorate([
        core_1.NgModule({
            imports: [MATERIAL_MODULES],
            exports: [MATERIAL_MODULES],
            providers: [icon_1.MdIconRegistry, core_2.MdUniqueSelectionDispatcher],
        }), 
        __metadata('design:paramtypes', [])
    ], AppMaterialModule);
    return AppMaterialModule;
}());
exports.AppMaterialModule = AppMaterialModule;
//# sourceMappingURL=app.material.module.js.map