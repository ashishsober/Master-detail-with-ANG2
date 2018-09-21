import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';
import { GenericMethods } from './generic-methods';




@Injectable()
export class PlayerDataService {
    big_blind;
    BG_COLOR = "006600";
    BG_HILITE = "EFEF30";
    SUIT_LINK = "http://google.com/";
    private current_bettor_index;

    constructor(private genericMethods: GenericMethods) { }

    deal_and_write_a(button_index, players, deck_index, cards, speed, big_blind_data) {
        var pause_time = 0;
        this.big_blind = big_blind_data;
        for (var i = 0; i < players.length; i++) {
            this.genericMethods.doSetTimeoutForDeal_A(i, button_index, players, deck_index++, cards);
        }
        setTimeout(() => this.deal_and_write_b(button_index, players, deck_index, cards, speed), 10000);
    }

    deal_and_write_b(button_index, players, deck_index, cards, speed) {
        for (var i = 0; i < players.length; i++) {
            this.genericMethods.doSetTimeoutForDeal_B(i, button_index, players, deck_index++, cards);
        }
        setTimeout(() => this.main(players, button_index), 14000);
    }

    main(players, button_index) {
        var increment_bettor_index = 0;
        this.current_bettor_index = this.genericMethods.get_next_player_position(this.big_blind, 1, players);

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

                this.write_player(0, 1, 0, 1, players, button_index);
                //this.write_frame("general", html, "");
                return;
            } else {
                this.write_player(this.current_bettor_index, 1, 0, 1, players, button_index);
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
                if (this.genericMethods.has_money(j, players) && players[j].subtotal_bet < this.genericMethods.current_bet) {
                    can_break = false;
                    break;
                }
            }
        }
        if (increment_bettor_index)
            this.current_bettor_index = this.genericMethods.get_next_player_position(this.current_bettor_index, 1, players);
        if (can_break)
            setTimeout("ready_for_next_card()", 20000);
        else this.main(players, button_index);
    }

    
    write_player(n, hilite, show_cards, mode, players, button_index) {
        var carda = "",
            cardb = "";
        var base_background = this.BG_COLOR;
        if (hilite == 1) base_background = this.BG_HILITE;
        else if (hilite == 2) base_background = "FF0000";
        if (players[n].status == "FOLD") base_background = "999999";
        var background = " background=cardback.gif";
        var background_a = "";
        var background_b = "";
        var background_color_a = base_background;
        var background_color_b = base_background;
        if (players[n].carda) {
            background_a = background;
            if (n == 0 || (show_cards && players[n].status != "FOLD")) {
                background_a = "";
                background_color_a = "FFFFFF";
                carda = this.get_card_html(players[n].carda);
            }
        }
        if (players[n].cardb) {
            background_b = background;
            if (n == 0 || (show_cards && players[n].status != "FOLD")) {
                background_b = "";
                background_color_b = "FFFFFF";
                cardb = this.get_card_html(players[n].cardb);
            }
        }
        var button = "";
        if (n == button_index) button = "<font color=FFFFFF>@</font>";
        var bet_text = "";
        var allin = "bet:";
        if (!this.genericMethods.has_money(n, players)) allin = "<font color=FF0000>ALL IN:</font>";
        if (mode != 1 || players[n].subtotal_bet > 0 || players[n].status == "CALL")
            bet_text = "<b><font size=+2>" + allin + " <font color=00EE00>" + players[n].subtotal_bet + "</font></font></b>";
        else if (!this.genericMethods.has_money(n, players) && players[n].status != "FOLD" && players[n].status != "BUST")
            bet_text = "<b><font size=+2 color=FF0000>ALL IN</font></b>";
        if (players[n].status == "FOLD")
            bet_text = "<b><font size=+2>FOLDED</font></b>";
        else if (players[n].status == "BUST")
            bet_text = "<b><font size=+2 color=FF0000>BUSTED</font></b>";

        var html = "<html><body bgcolor=" + base_background + " topmargin=4 bottommargin=0><pre><b><font size=+2>" + button + players[n].name + "</font></b>" +
            " [" + players[n].bankroll + "]" +
            "<font size=-1 face=times color=" + base_background + ">\nCHEAT! " + players[n].carda.substring(0, 1) + this.genericMethods.make_readable_rank(players[n].carda.substring(1)) + " " + players[n].cardb.substring(0, 1) + this.genericMethods.make_readable_rank(players[n].cardb.substring(1)) + "\n</font>" +
            "<center><table bgcolor=" + base_background + " height=87 width=130><tr align=center><td bgcolor=" + background_color_a + " width=50%" + background_a + ">" + carda + "</td><td></td><td  bgcolor=" + background_color_b + " width=50%" + background_b + ">" + cardb + "</td></tr></table><small>"

        if (navigator.userAgent.indexOf("MSIE") > -1) html += "\n"; //FF
        html += "\n</small>" + bet_text + "</center></pre></body></html>";
        //return "player" + n;
        //this.write_frame("player" + n, html, "");
    }


    get_card_html(card) {
        var suit = card.substring(0, 1);
        var color = "FF0000";
        if (suit == "c" || suit == "s") color = "000000";
        var r = card.substring(1);
        var rank = this.genericMethods.make_readable_rank(r);
        return "<font size=+2 color=" + color + "><b>" + rank + "</b></font> <a href='" + this.SUIT_LINK + "' target=_blank><img src=" + suit + ".gif border=0 title=" + suit + " alt=" + suit + "></a>";
    }





} //closing class

