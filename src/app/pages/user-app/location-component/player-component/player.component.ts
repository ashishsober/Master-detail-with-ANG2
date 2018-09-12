import { Component, Input } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'ngx-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  constructor(){}
  @Input() name:string;
  @Input() bankroll;
  @Input() carda;
  @Input() cardb;
  @Input() subtotal_bet;
}
