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
  @Input() button_index;
  constructor(private playerDataService:PlayerDataService,
    private genericMethods: GenericMethods){}
  
  human_call(players) {
    players[0].status = "CALL";
    this.genericMethods.current_bettor_index = this.genericMethods.get_next_player_position(0, 1, players);
    this.genericMethods.bet(0, this.genericMethods.current_bet - this.players[0].subtotal_bet,players);
    this.playerDataService.write_player(0, 0, 0, 0, players, this.button_index);
    //write_ad();
    this.playerDataService.main(players, this.button_index, this.genericMethods.current_bettor_index);
  }

  human_raise(players) {
    var to_call = this.genericMethods.current_bet - players[0].subtotal_bet;
    var prompt_text = "Minimum raise is " + this.genericMethods.current_min_raise + ". How much do you raise? DON'T include the " + to_call + " needed to call.";
    if (to_call == 0) prompt_text = "The minimum bet is " + this.genericMethods.current_min_raise + ". How much you wanna bet?";
    var bet_amount = prompt(prompt_text, "");
    if (bet_amount == null) return;
    this.handle_human_bet(bet_amount, players);
  }

   handle_human_bet(bet_amount, players) {
    bet_amount = "" + bet_amount;
    var m;
    for (var i = 0; i < bet_amount.length; i++) {
      var c = bet_amount.substring(i, i + 1);
      if (c == "0" || c > 0) m += "" + c;
    }
    if (m == "") return;
    bet_amount = m - 0;
    if (bet_amount < 0 || isNaN(bet_amount)) bet_amount = 0;
    var to_call = this.genericMethods.current_bet - this.players[0].subtotal_bet;
    bet_amount += to_call;
    var is_ok_bet = this.genericMethods.bet(0, bet_amount,players);
    if (is_ok_bet) {
      this.players[0].status = "CALL";
      this.genericMethods.current_bettor_index = this.genericMethods.get_next_player_position(0, 1, players);
      this.playerDataService.write_player(0, 0, 0, 0, players, this.button_index);
      // write_ad();
      this.playerDataService.main(players, this.button_index, this.genericMethods.current_bettor_index);
    }
  }

  human_fold(players) {
    players[0].status = "FOLD";
    this.genericMethods.current_bettor_index = this.genericMethods.get_next_player_position(0, 1,players);
    this.playerDataService.write_player(0, 0, 0, 0, players, this.button_index);
    //this.write_basic_general();
    //write_ad();
    this.playerDataService.main(players, this.button_index, this.genericMethods.current_bettor_index);

  }
}
