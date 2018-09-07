import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../../../modals/dialog/alert-dialog.component';

@Component({
  moduleId: 'module.id',
  selector: 'my-material',
  templateUrl: './applicant-field.component.html',
  styleUrls: ['./applicant-field.component.scss']
})
export class ApplicantFieldComponent implements OnInit {
  mydata;
  count = [];
  appData;
  fileNameDialogRef: MatDialogRef<AlertDialogComponent>;
  constructor(private dataService: DataService,
              private dialog: MatDialog) { }

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
    if (f.valid) {
      this.dataService.postSubmitApplicant(f.value).subscribe(data => {
        this.appData = data;
        this.checkServerResponse(this.appData,f);
      }, err => {
        console.log(err);
      });
    }
  }

  checkServerResponse(appData,form:NgForm) {
    let applicationStatus = appData.application.response_type.toUpperCase(); //info
    let responseAction = appData.application.response_action.toUpperCase();
    switch (responseAction) {
      case 'STOP':
        this.errorModal(appData);
        break;
      case 'CONTINUE':
      case 'SUCCESS':
        this.errorModal(appData);
        form.reset();
        break;
      default:
        //error modal to show  
        this.errorModal(appData);
    }

  }

  errorModal(appData) {
    this.fileNameDialogRef = this.dialog.open(AlertDialogComponent, {
      hasBackdrop: true,
      height: '316px',
      width: '874px',
      disableClose: true,
      data: appData
    });
  }
}
