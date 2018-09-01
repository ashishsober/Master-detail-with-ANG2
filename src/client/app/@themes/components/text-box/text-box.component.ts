import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    moduleId: 'module.id',
    selector: 'text-box',
    templateUrl:'./text-box.component.html',
    providers:[ { provide:NG_VALUE_ACCESSOR,useExisting:TextBox,multi:true} ]
})
export class TextBox implements ControlValueAccessor {
    @Input()labelName;
    value;  //coming from applicant-field section
    private onChange: (value:string) => void;
    constructor(){ }

    writeValue(value:string){
        //this function accepts the string value
        //this.name = value;
        //this.onChange(value);
    }

    registerOnChange(onChange: (value:string) => void){
        //this function needs to store the callback 
        this.onChange = onChange;
    }

    registerOnTouched(){}
}
