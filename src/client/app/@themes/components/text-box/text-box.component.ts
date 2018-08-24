import { Component, OnInit, Output, Input } from '@angular/core';


@Component({
    moduleId: 'module.id',
    selector: 'text-box',
    templateUrl:'./text-box.component.html'
})
export class TextBox {
    @Input()data;
    constructor(){ }
}
