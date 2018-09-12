import { Component, Input } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'ngx-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() card; 
  
  constructor(){
    console.log(this.card);
  }
}
