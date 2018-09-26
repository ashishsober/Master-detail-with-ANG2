import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';
import { GenericMethods } from './generic-methods';
import { BotService } from './bot.service';



@Injectable()
export class PlayerDataService {
    big_blind;
    BG_COLOR = "#006600"; //green color
    BG_HILITE = "#EFEF30"; //yellow color
    SUIT_LINK = "http://google.com/";
    bot_bet_timer;
    timer;
    timerMain;

    constructor(private genericMethods: GenericMethods) { }

    deal_and_write_a(button_index, players, deck_index, cards, speed, current_bettor_index) {
        var pause_time = 0;
        for (var i = 0; i < players.length; i++) {
            this.genericMethods.doSetTimeoutForDeal_A(i, button_index, players, deck_index++, cards);
        }
        this.timer = setTimeout(() => this.deal_and_write_b(button_index, players, deck_index, cards, speed, current_bettor_index), 10000);
    }

    deal_and_write_b(button_index, players, deck_index, cards, speed, current_bettor_index) {
        clearTimeout(this.timer);
        for (var i = 0; i < players.length; i++) {
            this.genericMethods.doSetTimeoutForDeal_B(i, button_index, players, deck_index++, cards);
        }
        this.timerMain = setTimeout(() => this.main(players, button_index, current_bettor_index), 14000);
    }

    main(players, button_index, current_bettor_index) {
        clearTimeout(this.timerMain);
        var increment_bettor_index = 0;
        //this.current_bettor_index = this.genericMethods.get_next_player_position(this.big_blind, 1, players);

        if (players[current_bettor_index].status == "BUST" || players[current_bettor_index].status == "FOLD") {
            increment_bettor_index = 1;
        } else if (!this.genericMethods.has_money(current_bettor_index, players)) {
            players[current_bettor_index].status = "CALL";
            increment_bettor_index = 1;
        } else if (players[current_bettor_index].status == "CALL" && players[current_bettor_index].subtotal_bet == this.genericMethods.current_bet) {
            increment_bettor_index = 1;
        } else {
            players[current_bettor_index].status = "";
            if (current_bettor_index == 0) {
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

                var html = "<html><body vlink=0000FF topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.c.focus();'><table width=100%><tr><td colspan=2>" + this.genericMethods.get_pot_size_html(players) +
                    "</td></tr><tr><td><font size=+2><b>Current total bet: " + this.genericMethods.current_bet + "</b><br> You need <font color=FF0000 size=+3>" + to_call + "</font> more to call.</font>" +
                    "<form name=f><input name=c type=button value='" + call_button_text + "' onclick='parent.human_call()'><input type=button value='" + bet_button_text + "' onclick='parent.human_raise()'>" + fold_button +
                    "</form></td><td valign=bottom><table" + quick_color + "><tr><td align=center>" + quick_bets + "</td></tr></table></td></tr></table></body></html>";

                this.write_player(0, 1, 0, 1, players, button_index);
                this.genericMethods.write_frame("general", html, "", players);
                return;
            } else {
                this.genericMethods.get_pot_size_html(players); //updating the pot-view component
                this.write_player(current_bettor_index, 1, 0, 1, players, button_index);
                this.bot_bet_timer = setTimeout(() => this.bot_bet(current_bettor_index, players, button_index, current_bettor_index), 8000);
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
                if (this.genericMethods.has_money(j, players) && players[j].subtotal_bet < this.genericMethods.current_bet) {
                    can_break = false;
                    break;
                }
            }
        }
        if (increment_bettor_index)
            current_bettor_index = this.genericMethods.get_next_player_position(current_bettor_index, 1, players);
        if (can_break) {
            this.genericMethods.get_pot_size_html(players); //updating the pot-view component
            setTimeout(this.genericMethods.ready_for_next_card(), 12000);
        }
        else
            this.main(players, button_index, current_bettor_index);
    }


    write_player(n, hilite, show_cards, mode, players, button_index) {
        var carda = "",
            cardb = "";
        var base_background;
        if (hilite == 1) players[n].background.base_background = this.BG_HILITE; //yellow color
        else if (hilite == 2) players[n].background.base_background = "#FF0000";
        if (players[n].status == "FOLD") players[n].background.base_background = "#F44336";//red color for fold
        var background = " background=cardback.gif";
        var background_a = "";
        var background_b = "";
        var background_color_a = base_background;
        var background_color_b = base_background;
        if (players[n].carda) {
            background_a = background;
            if (n == 0 || (show_cards && players[n].status != "FOLD")) {
                background_a = "";
                background_color_a = "#FFFFFF";
                carda = this.get_card_html(players[n].carda);
            }
        }
        if (players[n].cardb) {
            background_b = background;
            if (n == 0 || (show_cards && players[n].status != "FOLD")) {
                background_b = "";
                background_color_b = "#FFFFFF";
                cardb = this.get_card_html(players[n].cardb);
            }
        }
        var button = "";
        if (n == button_index) button = "<font color=#FFFFFF>@</font>";
        var bet_text = "";
        var allin = "bet:";

        if (!this.genericMethods.has_money(n, players)) allin = "<font color=#FF0000>ALL IN:</font>";
        if (mode != 1 || players[n].subtotal_bet > 0 || players[n].status == "CALL")
            bet_text = "<b><font size=+2>" + allin + " <font color=#00EE00>" + players[n].subtotal_bet + "</font></font></b>";
        else if (!this.genericMethods.has_money(n, players) && players[n].status != "FOLD" && players[n].status != "BUST")
            bet_text = "<b><font size=+2 color=#FF0000>ALL IN</font></b>";
        if (players[n].status == "FOLD")
            bet_text = "<b><font size=+2>FOLDED</font></b>";
        else if (players[n].status == "BUST")
            bet_text = "<b><font size=+2 color=#FF0000>BUSTED</font></b>";

        //insert values to the particular player into the player object
        // players[n].background.base_background = base_background;
        players[n].background.background_color_a = background_color_a;
        players[n].background.background_a = background_a;
        players[n].background.background_color_b = background_color_b;
        players[n].background.background_b = background_b;



        var html = "<html><body bgcolor=" + base_background + " topmargin=4 bottommargin=0><pre><b><font size=+2>" + button + players[n].name + "</font></b>" +
            " [" + players[n].bankroll + "]" +
            "<font size=-1 face=times color=" + base_background + ">\nCHEAT! " + players[n].carda.substring(0, 1) + this.genericMethods.make_readable_rank(players[n].carda.substring(1)) + " " + players[n].cardb.substring(0, 1) + this.genericMethods.make_readable_rank(players[n].cardb.substring(1)) + "\n</font>" +
            "<center><table bgcolor=" + base_background + " height=87 width=130><tr align=center><td bgcolor=" + background_color_a + " width=50%" + background_a + ">" + carda + "</td><td></td><td  bgcolor=" + background_color_b + " width=50%" + background_b + ">" + cardb + "</td></tr></table><small>"

        if (navigator.userAgent.indexOf("MSIE") > -1) html += "\n"; //FF
        html += "\n</small>" + bet_text + "</center></pre></body></html>";
        return "player" + n;
        //this.write_frame("player" + n, html, "");
    }

    bot_bet(x, players, button_index, current_bettor_index) {
        clearTimeout(this.bot_bet_timer);
        // this.timer.data.handleId;
        var b = 0;
        var n = this.genericMethods.current_bet - players[x].subtotal_bet;

        //if u set b =0 ,player will get fold
        //if you set b=10 ,player will not be fold
        if (!this.genericMethods.board[0])
            b = 10; //this.botService.get_preflop_bet(players,this.current_bettor_index); 
        else
            b = 0;  //this.botService.get_preflop_bet(players, current_bettor_index);

        if (b >= players[x].bankroll) //ALL IN
            players[x].status = "";
        else if (b < n) { //BET 2 SMALL
            b = 0;
            players[x].status = "FOLD";
        } else if (b == n) { //CALL
            players[x].status = "CALL";
        } else if (b > n) {
            if (b - n < this.genericMethods.current_min_raise) { //RAISE 2 SMALL
                b = n;
                players[x].status = "CALL";
            } else players[x].status = ""; //RAISE
        }
        if (this.genericMethods.bet(x, b, players) == 0) {
            players[x].status = "FOLD";
            this.genericMethods.bet(x, 0, players);
        }
        this.write_player(current_bettor_index, 0, 0, 0, players, button_index);
        current_bettor_index = this.genericMethods.get_next_player_position(current_bettor_index, 1, players);
        this.main(players, button_index, current_bettor_index);
    }

    get_card_html(card) {
        var suit = card.substring(0, 1);
        var color = "#FF0000";
        if (suit == "c" || suit == "s") color = "#000000";
        var r = card.substring(1);
        var rank = this.genericMethods.make_readable_rank(r);
        return "<font size=+2 color=" + color + "><b>" + rank + "</b></font> <a href='" + this.SUIT_LINK + "' target=_blank><img src=" + suit + ".gif border=0 title=" + suit + " alt=" + suit + "></a>";
    }
} //closing class

