import { Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../table.component';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() card;
  constructor(private locationComponent: TableComponent) { }
}
