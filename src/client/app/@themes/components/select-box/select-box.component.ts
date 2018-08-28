import { Component, OnInit, Output, Input } from '@angular/core';
import { Hero } from '../../../core/interface';
import { DataService } from '../../../core/data.service';

@Component({
    moduleId: 'module.id',
    selector: 'select-box',
    templateUrl: './select-box.component.html'
})
export class SelectBox {
    @Input() data;
    heroes: Hero[] = [];
    constructor(private heroService: DataService) { }
    
    lovData(lovFieldData: string) {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
