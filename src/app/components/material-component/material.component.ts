import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Hero } from '../../core/interface';

@Component({
  moduleId: 'module.id',
  selector: 'my-material',
  templateUrl: './material.component.html',
})
export class MaterialComponent implements OnInit {

  constructor(private deroService: DataService) { }
  mydata;
  heroes: Hero[] = [];
  ngOnInit() {

    this.deroService.getFieldmetadata()
      .then(data => {
        this.mydata = data.fieldmetadata.data.stages[0].fields;
        //console.log("my fieldmetadata===" + this.mydata);
      });
  }

  lovData() {
    this.deroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
