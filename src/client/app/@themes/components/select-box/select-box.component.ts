import { Component, OnInit, Output, Input } from '@angular/core';
import { lov } from '../../../core/interface';
import { DataService } from '../../../core/data.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    moduleId: 'module.id',
    selector: 'select-box',
    templateUrl: './select-box.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectBox, multi: true }
    ]
})
export class SelectBox implements ControlValueAccessor {
    @Input() selectboxData: lov[] = [];
    @Input() placeholder: string;
    @Input() lovfieldname: string;
    selectedValue: string;

    constructor(private dataService: DataService) { }

    //to get the lov data to populate on select-box
    lovData(lovFieldData: string) {
        this.dataService.getLov(lovFieldData)
            .then(data => this.selectboxData = data);
    }

    private onChange: (value: string) => void;

    onselect(value: string) {
        this.selectedValue = value;
        this.onChange(value);
    }

    writeValue(value: string) {
        this.selectedValue = value;
    }

    registerOnChange(onChange: (value: string) => void) {
        this.onChange = onChange;
    }

    registerOnTouched() { }
}
