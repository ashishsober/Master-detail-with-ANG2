import { Component, OnInit, Output, Input } from '@angular/core';
import { Hero, lov } from '../../../core/interface';
import { DataService } from '../../../core/data.service';
import { titles } from '../../../core/mock-data';

@Component({
    moduleId: 'module.id',
    selector: 'select-box',
    templateUrl: './select-box.component.html'
})
export class SelectBox {
    @Input() data;
    selectboxData: lov[] = [];
    constructor(private dataService: DataService) { }
    
    lovData(lovFieldData: string) {
        this.dataService.getLov(lovFieldData)
            .then(data => this.selectboxData = data);
    }
}
