import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';
import { GenericMethods } from './generic-methods';
@Injectable()
export class PlayerDataService {
    big_blind ;
    private current_bettor_index;
    
    constructor(private genericMethods:GenericMethods){}

    deal_and_write_a(button_index, players, deck_index, cards, speed,big_blind_data) {
        var pause_time = 0;
        this.big_blind = big_blind_data;
        for (var i = 0; i < players.length; i++) {
            this.doSetTimeoutForDeal_A(i, button_index, players, deck_index++, cards);
        }
        //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
        setTimeout(() => this.deal_and_write_b(button_index, players, deck_index, cards, speed),10000);
    }

    doSetTimeoutForDeal_A(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            console.log("player position--->" ,i * 2000);
            players[j].carda = cards[deck_index];
        },i * 2000);
    }

    deal_and_write_b(button_index, players, deck_index, cards, speed) {
        for (var i = 0; i < players.length; i++) {
            this.doSetTimeoutForDeal_B(i, button_index, players, deck_index++, cards);
            //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
        }
        setTimeout(() => this.main(players), 14000);
    }

    doSetTimeoutForDeal_B(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            players[j].cardb = cards[deck_index];
        },i * 2000);
    }

    get_next_player_position(i, delta, players) {
        var j = 0,
            step = 1;
        if (delta < 0) step = -1;
        while (1) {
            i += step;
            if (i >= players.length) i = 0;
            else if (i < 0) i = players.length - 1;
            if (players[i].status == "BUST" || players[i].status == "FOLD" || ++j < delta) { } else break;
        }
        return i;
    }


    
    main(players) {
        var increment_bettor_index = 0;
        this.current_bettor_index = this.get_next_player_position(this.big_blind, 1,players);

        if (players[this.current_bettor_index].status == "BUST" || players[this.current_bettor_index].status == "FOLD") {
          increment_bettor_index = 1;
        } else if (!this.genericMethods.has_money(this.current_bettor_index, players)) {
          players[this.current_bettor_index].status = "CALL";
          increment_bettor_index = 1;
        } else if (players[this.current_bettor_index].status == "CALL" && players[this.current_bettor_index].subtotal_bet == this.genericMethods.current_bet) {
          increment_bettor_index = 1;
        } else {
          players[this.current_bettor_index].status = "";
          if (this.current_bettor_index == 0) {
            var call_button_text = "     Call     ";
            var fold_button = "<input type=button value=Fold onclick='parent.human_fold()'>";
            var bet_button_text = "   Raise   ";
            var to_call = this.genericMethods.current_bet - players[0].subtotal_bet;
            if (to_call > players[0].bankroll) to_call = players[0].bankroll;
            if (to_call == 0) {
              call_button_text = "   Check   ";
              fold_button = "";
              bet_button_text = "     Bet     ";
            }
            var quick_values = new Array(6);
            if (to_call < players[0].bankroll) quick_values[0] = this.genericMethods.current_min_raise;
            var quick_start = quick_values[0];
            if (quick_start < 20) quick_start = 20;
            else quick_start = this.genericMethods.current_min_raise + 20;
            for (var i = 0; i < 5; i++) { if (quick_start + 20 * i < players[0].bankroll) quick_values[i + 1] = quick_start + 20 * i; }
            var bet_or_raise = "Bet";
            var quick_color = "";
            if (to_call > 0) {
              bet_or_raise = "Raise";
              quick_color = " bgcolor=" + this.BG_COLOR;
            }
            var quick_bets = "<b>Quick " + bet_or_raise + "s</b><br>";
            for (var i = 0; i < 6; i++) {
              if (quick_values[i]) quick_bets += "<a href='javascript:parent.handle_human_bet(" + quick_values[i] + ")'>" + quick_values[i] + "</a>" + "&nbsp;&nbsp;&nbsp;";
            }
            quick_bets += "<a href='javascript:parent.handle_human_bet(" + players[0].bankroll + ")'>All In!</a>" +
              "<form onsubmit='parent.handle_human_bet(b.value);return false;'><font size=+2>&nbsp;</font><input type=text size=4 name=b><input type=submit value=" + bet_or_raise + "></form>";
           
            // var html = "<html><body vlink=0000FF topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.c.focus();'><table width=100%><tr><td colspan=2>" + this.get_pot_size_html() +
            //   "</td></tr><tr><td><font size=+2><b>Current total bet: " + this.genericMethods.current_bet + "</b><br> You need <font color=FF0000 size=+3>" + to_call + "</font> more to call.</font>" +
            //   "<form name=f><input name=c type=button value='" + call_button_text + "' onclick='parent.human_call()'><input type=button value='" + bet_button_text + "' onclick='parent.human_raise()'>" + fold_button +
            //   "</form></td><td valign=bottom><table" + quick_color + "><tr><td align=center>" + quick_bets + "</td></tr></table></td></tr></table></body></html>";
           
            // this.write_player(0, 1, 0, 1);
            //this.write_frame("general", html, "");
            return;
          } else {
            //this.write_player(this.current_bettor_index, 1, 0, 1);
            //setTimeout("bot_bet(" + this.current_bettor_index + ")", 777 * this.speed);
            return;
          }
        }
        var can_break = true;
        for (var j = 0; j < players.length; j++) {
          var s = players[j].status;
          if (s == "OPTION") {
            can_break = false;
            break;
          }
          if (s != "BUST" && s != "FOLD") {
            if (this.genericMethods.has_money(j,players) && players[j].subtotal_bet < this.genericMethods.current_bet) {
              can_break = false;
              break;
            }
          }
        }
        if (increment_bettor_index)
          this.current_bettor_index = this.get_next_player_position(this.current_bettor_index, 1, players);
        if (can_break)
          setTimeout("ready_for_next_card()", 20000);
        else this.main(players);
      }



      
} //closing class

