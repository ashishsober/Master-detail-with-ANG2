import { Component, Input, OnInit } from '@angular/core';
import { LocationComponent } from '../../location.component';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() card;
  constructor(private locationComponent: LocationComponent) { }
}
