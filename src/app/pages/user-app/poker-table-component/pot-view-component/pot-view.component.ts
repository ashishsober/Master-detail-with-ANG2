import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericMethods } from '../@core/generic-methods';
import { Subscription } from 'rxjs';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-pot-view',
  templateUrl: './pot-view.component.html'
})
export class PotViewComponent implements OnInit,OnDestroy {
  subscribe : Subscription;
  potValue :number;
  constructor(private genericMethods : GenericMethods){}

  ngOnInit(){
    this.subscribe = this.genericMethods.emittingPotSize.subscribe((data) => {
       console.log("my pot value--->",data);
       this.potValue = data;
    });
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }
}
