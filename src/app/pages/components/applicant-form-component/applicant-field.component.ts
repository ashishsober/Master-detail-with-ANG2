import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Hero } from '../../../core/interface';

@Component({
  moduleId: 'module.id',
  selector: 'my-material',
  templateUrl: './applicant-field.component.html',
  styleUrls:['./applicant-field.component.scss']
  
})
export class ApplicantFieldComponent implements OnInit {

  constructor(private deroService: DataService) { }
  mydata;
  heroes: Hero[] = [];
  count=[];
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

  getDynamicClass(componentType,seqNo, positioning, i) {
    console.log(componentType,seqNo, positioning, i);
    this.count.push(i);
    if (this.count.length === 1 && positioning === '2') {
        return 'col-md-6 right-border half-width';
    } else if (positioning === '2') {
      this.count = [];
        return 'col-md-6 no-border half-width';
    } else {
      this.count = [];
        return 'col-md-12 full-width';
    }
  }
}
