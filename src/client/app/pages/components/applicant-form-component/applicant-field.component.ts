import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { NgForm } from '@angular/forms';
import { lov } from '../../../core/interface';

@Component({
  moduleId: 'module.id',
  selector: 'my-material',
  templateUrl: './applicant-field.component.html',
  styleUrls: ['./applicant-field.component.scss']
})
export class ApplicantFieldComponent implements OnInit {
  mydata;
  count = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFieldmetadata()
      .then(data => {
        this.mydata = data.fieldmetadata.data.stages[0].fields;
      });
  }

  getDynamicClass(rwb_name, seqNo, positioning, i) {
    //console.log('Rwb_name--->' + rwb_name + '  sequence_no----->' + seqNo + '  positioning--->' + positioning + '  my index----->' + i);
    this.count.push(i);
    if (this.count.length === 1 && positioning === '2') {
      return 'left-border half-width';
    } else if (positioning === '2') {
      this.count = [];
      return 'no-border right-border half-width';
    } else {
      this.count = [];
      return 'full-width';
    }
  }


  onSubmit(f: NgForm) {
    console.log("my form value-----" + f.value);
    console.log(f.valid);  // false
  }
}
