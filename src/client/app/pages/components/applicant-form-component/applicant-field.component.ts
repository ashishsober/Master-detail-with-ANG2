import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';


@Component({
  moduleId: 'module.id',
  selector: 'my-material',
  templateUrl: './applicant-field.component.html',
  styleUrls: ['./applicant-field.component.scss']

})
export class ApplicantFieldComponent implements OnInit {
  mydata;
  count = [];

  constructor(private heroService: DataService) { }

  ngOnInit() {
    this.heroService.getFieldmetadata()
      .then(data => {
        this.mydata = data.fieldmetadata.data.stages[0].fields;
        //console.log("my fieldmetadata===" + this.mydata);
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
}
