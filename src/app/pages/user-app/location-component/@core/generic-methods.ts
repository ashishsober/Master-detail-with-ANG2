import { Injectable } from "@angular/core";

@Injectable()
export class GenericMethods {
    current_bet: number;
    current_min_raise: number;

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
        let BIG_BLIND = bet_amount;
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
        return p;
    }
}