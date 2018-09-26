import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';


@Injectable()
export class GenericMethods {
    current_bet: number;
    current_min_raise: number;
    board;
    BIG_BLIND;
    HUMAN_WINS_AGAIN;
    current_bettor_index;
    button_index;
    emittingGeneralComponent = new Rx.BehaviorSubject(false);
    emittingPotSize = new Rx.BehaviorSubject(15);

    has_money(i, players) {
        if (players[i].bankroll >= .01) return true;
        return false;
    }

    clear_bets(players) {
        for (var i = 0; i < players.length; i++)
            players[i].subtotal_bet = 0;
        this.current_bet = 0;
    }

    clear_pot(players) {
        for (var i = 0; i < players.length; i++)
            players[i].total_bet = 0;
    }
    //not need further as handle in template
    make_readable_rank(r) {
        if (r < 11) return r;
        else if (r == 11) return "J";
        else if (r == 12) return "Q";
        else if (r == 13) return "K";
        else if (r == 14) return "A";
    }

    bet(player_index, bet_amount, players) {
        var BIG_BLIND = bet_amount;
        if (players[player_index].status == "FOLD") { } //FOLD
        else if (bet_amount >= players[player_index].bankroll) { //ALL IN
            bet_amount = players[player_index].bankroll;

            var old_current_bet = this.current_bet;

            if (players[player_index].subtotal_bet + bet_amount > this.current_bet)
                this.current_bet = players[player_index].subtotal_bet + bet_amount;

            var new_current_min_raise = this.current_bet - old_current_bet;
            if (new_current_min_raise > this.current_min_raise) this.current_min_raise = new_current_min_raise;

            players[player_index].status = "CALL";
        } else if (bet_amount + players[player_index].subtotal_bet == this.current_bet) { //CALL
            players[player_index].status = "CALL";
        } else if (this.current_bet > players[player_index].subtotal_bet + bet_amount) { //2 SMALL

            //COMMENT OUT TO FIND BUGS
            if (player_index == 0)

                alert("The current bet to match is " + this.current_bet + "." +
                    "\nYou must bet a total of at least " + (this.current_bet - players[player_index].subtotal_bet) + " or fold.");
            return 0;
        } else if (bet_amount + players[player_index].subtotal_bet > this.current_bet //RAISE 2 SMALL
            &&
            this.get_pot_size(players) > 0 &&
            bet_amount + players[player_index].subtotal_bet - this.current_bet < this.current_min_raise) {

            //COMMENT OUT TO FIND BUGS
            if (player_index == 0)

                alert("Minimum raise is currently " + this.current_min_raise + ".");
            return 0;
        } else { //RAISE
            players[player_index].status = "CALL";

            var old_current_bet = this.current_bet;
            this.current_bet = players[player_index].subtotal_bet + bet_amount;

            if (this.get_pot_size(players) > 0) {
                this.current_min_raise = this.current_bet - old_current_bet;
                if (this.current_min_raise < BIG_BLIND) this.current_min_raise = BIG_BLIND;
            }
        }
        players[player_index].subtotal_bet += bet_amount;
        players[player_index].bankroll -= bet_amount;
        //this.write_basic_general();
        return 1;
    }


    get_pot_size(players) {
        var p = 0;
        for (var i = 0; i < players.length; i++)
            p += players[i].total_bet + players[i].subtotal_bet;
        this.emittingPotSize.next(p);
        return p;
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

    doSetTimeoutForDeal_A(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            console.log("player position--->", i * 2000);
            players[j].carda = cards[deck_index];
        }, i * 2000);
    }

    doSetTimeoutForDeal_B(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            players[j].cardb = cards[deck_index];
        }, i * 2000);
    }

    reset_player_statuses(type, players) {
        for (var i = 0; i < players.length; i++) {
            if (type == 0) players[i].status = "";
            else if (type == 1 && players[i].status != "BUST") players[i].status = "";
            else if (type == 2 && players[i].status != "FOLD" && players[i].status != "BUST") players[i].status = "";
        }
    }

    collect_cards(players) {
        this.board = new Array(5);
        for (var i = 0; i < players.length; i++) {
            players[i].carda = "";
            players[i].cardb = "";
        }
    }

    write_frame(f: any, html: any, n: any, player): void {
        if(f === "general"){
            console.log("inside write_frame function--", player,"  my component name to trigger--",f);
            this.emittingGeneralComponent.next(true);
        }
        // try {
        //   //console.log("type of component  " + f);
        //   frames[f].document.open("text/html", "replace");
        //   frames[f].document.write(html);
        //   frames[f].document.close();
        //   var u = navigator.userAgent;
        //   if (u.indexOf("Opera") < 0 && u.indexOf("Safari") < 0 && u.indexOf("MSIE") > -1) frames[f].location.reload();
        // } catch (e) { //FF
        //   if (!n) n = 0;
        //   //if (n < 9)
        //   // this.write_frame(f, html, ++n);
        // }
    }

    get_pot_size_html(players) {
        return "<font color=00EE00 size=+4><b>TOTAL POT: " + this.get_pot_size(players) + "</b></font>";
    }

    ready_for_next_card() {
        alert("ready for next card or open the flop")
    // var num_betting = this.get_num_betting();
    // for (var i = 0; i < this.players.length; i++) { this.players[i].total_bet += this.players[i].subtotal_bet; }
    // this.genericMethods.clear_bets(this.players);
    // if (this.genericMethods.board[4]) {
    //   this.handle_end_of_round();
    //   return;
    // }
    // this.genericMethods.current_min_raise = this.genericMethods.BIG_BLIND;
    // this.genericMethods.reset_player_statuses(2,this.players);
    // if (this.players[this.button_index].status == "FOLD") this.players[this.genericMethods.get_next_player_position(this.button_index, -1, this.players)].status = "OPTION";
    // else this.players[this.button_index].status = "OPTION";
    // this.current_bettor_index = this.genericMethods.get_next_player_position(this.button_index, 1, this.players);
    // var show_cards = 0;
    // if (num_betting < 2) show_cards = 1;

    // if (!this.RUN_EM)
    //   for (var i = 0; i < this.players.length; i++)
    //     if (this.players[i].status != "BUST" && this.players[i].status != "FOLD") this.playerDataService.write_player(i, 0, show_cards, 1, this.players,this.button_index);

    // if (num_betting < 2) this.RUN_EM = 1;
    // if (!this.genericMethods.board[0]) this.deal_flop();
    // else if (!this.genericMethods.board[3]) this.deal_fourth();
    // else if (!this.genericMethods.board[4]) this.deal_fifth();
  }


}