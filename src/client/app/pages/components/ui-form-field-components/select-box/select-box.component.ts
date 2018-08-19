import { Component, OnInit, Output, Input } from '@angular/core';


@Component({
    moduleId: 'module.id',
    selector: 'select-box',
    templateUrl:'./select-box.component.html'
})
export class SelectBox {
    @Input()data;
}
