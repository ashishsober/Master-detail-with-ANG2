import { Component, Input } from '@angular/core';
import { PlayerDataService } from '../@core/player-data.service';
import { GenericMethods } from '../@core/generic-methods';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent {
  @Input() players;
  constructor(private playerDataService:PlayerDataService,
    private genericMethods: GenericMethods){}
  
  human_call(players) {
    players[0].status = "CALL";
    this.genericMethods.current_bettor_index = this.genericMethods.get_next_player_position(0, 1, players);
    this.genericMethods.bet(0, this.genericMethods.current_bet - this.players[0].subtotal_bet,players);
    this.playerDataService.write_player(0, 0, 0, 0, players, this.genericMethods.button_index);
    //write_ad();
    this.playerDataService.main(players, this.genericMethods.button_index, this.genericMethods.current_bettor_index);
  }
}
