import { Component, Input, OnInit } from '@angular/core';
import { LocationComponent } from '../../location.component';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  @Input() card;

  constructor(private locationComponent: LocationComponent) {
    console.log("Inside the card compenent---- ",this.card);
  }

  ngOnInit() {
    //this.new_round();
  }

  current_min_raise;
  RUN_EM;
  board;
  deck_index;

  //who are the players are eligible to play
  new_round() {
    this.RUN_EM = 0;
    this.locationComponent.NUM_ROUNDS++;
    var num_playing = 0;
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      if (this.has_money(i))
        num_playing += 1;
    }
    if (num_playing < 2) {
      this.write_frame("general", "<html><body topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.y.focus();'><font size=+2>Play again?</font><form name=f><input name=y type=button value='  Yes  ' onclick='parent.new_game()'><input type=button value='  No  ' onclick='parent.confirm_quit()'></form></body></html>", "");
      return;
    }

    this.preload_pix();
    this.reset_player_statuses(1);
    this.clear_bets();
    this.clear_pot();
    this.current_min_raise = 0;
    this.collect_cards();
    //write_ad();
    this.locationComponent.button_index = this.get_next_player_position(this.locationComponent.button_index, 1);

    for (var i = 0; i < this.locationComponent.players.length; i++) this.write_player(i, 0, 0, 1);
    for (var i = 0; i < this.board.length; i++) this.write_frame("board" + i, "<html><body bgcolor=" + this.BG_COLOR + "></body></html>", "");

    if (this.locationComponent.NUM_ROUNDS > 1) {
      this.write_frame("board4", "<html><body bgcolor=" + this.BG_COLOR + "><iframe width=100% height=100% border=0 frameborder=0 src=http://rawdataserver.com/poker/firefox.html></iframe></body></html>", "");
      try { //FF


        frames["board4"].location.reload(); //for ads to display


      } catch (e) { }
      this.write_frame("board0", "<html><body bgcolor=" + this.BG_COLOR + "><center><table height=100%><tr><td valign=center><font color=FFFFFF><tt>Play poker for real money at Gus Hansen's PokerChamps! <b>Play against Gus!</b><div align=right>>>></div></tt></font></td></tr></table></center></body></html>", "");
      this.write_frame("board1", "<html><body bgcolor=" + this.BG_COLOR + "><center><table height=100%><tr><td valign=center><a href='https://secure.pokerchamps.com/pokerpublic/arequest?acode=UXBIHDUC' target=_blank><img src=pcbanner.gif border=0></a></td></tr></table></center></body></html>", "");
    }

    this.shuffle();
    this.blinds_and_deal();
  }

  has_money(i) {
    if (this.locationComponent.players[i].bankroll >= .01) return true;
    return false;
  }
  

  shuffle() {
    this.deck_index = 0;
    this.locationComponent.cards.sort(this.compRan);
  }

  SMALL_BLIND;
  BIG_BLIND;
  current_bettor_index;

  blinds_and_deal() {
    this.SMALL_BLIND = 5;
    this.BIG_BLIND = 10;
    var num_playing = 0;
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      if (this.has_money(i)) num_playing += 1;
    }
    if (num_playing == 3) {
      this.SMALL_BLIND = 10;
      this.BIG_BLIND = 20;
    } else if (num_playing < 3) {
      this.SMALL_BLIND = 25;
      this.BIG_BLIND = 50;
    }
    var small_blind = this.get_next_player_position(this.locationComponent.button_index, 1);
    this.bet(small_blind, this.SMALL_BLIND);
    this.write_player(small_blind, 0, 0, 0);
    var big_blind = this.get_next_player_position(small_blind, 1);
    this.bet(big_blind, this.BIG_BLIND);
    this.write_player(big_blind, 0, 0, 0);
    this.locationComponent.players[big_blind].status = "OPTION";
    this.current_bettor_index = this.get_next_player_position(big_blind, 1);
    this.deal_and_write_a();
  }

  bet(player_index, bet_amount) {
    if (this.locationComponent.players[player_index].status == "FOLD") { } //FOLD
    else if (bet_amount >= this.locationComponent.players[player_index].bankroll) { //ALL IN
      bet_amount = this.locationComponent.players[player_index].bankroll;

      var old_current_bet = this.locationComponent.current_bet;

      if (this.locationComponent.players[player_index].subtotal_bet + bet_amount > this.locationComponent.current_bet)
        this.locationComponent.current_bet = this.locationComponent.players[player_index].subtotal_bet + bet_amount;

      var new_current_min_raise = this.locationComponent.current_bet - old_current_bet;
      if (new_current_min_raise > this.current_min_raise) this.current_min_raise = new_current_min_raise;

      this.locationComponent.players[player_index].status = "CALL";
    } else if (bet_amount + this.locationComponent.players[player_index].subtotal_bet == this.locationComponent.current_bet) { //CALL
      this.locationComponent.players[player_index].status = "CALL";
    } else if (this.locationComponent.current_bet > this.locationComponent.players[player_index].subtotal_bet + bet_amount) { //2 SMALL

      //COMMENT OUT TO FIND BUGS
      if (player_index == 0)

        alert("The current bet to match is " + this.locationComponent.current_bet + "." +
          "\nYou must bet a total of at least " + (this.locationComponent.current_bet - this.locationComponent.players[player_index].subtotal_bet) + " or fold.");
      return 0;
    } else if (bet_amount + this.locationComponent.players[player_index].subtotal_bet > this.locationComponent.current_bet //RAISE 2 SMALL
      &&
      this.get_pot_size() > 0 &&
      bet_amount + this.locationComponent.players[player_index].subtotal_bet - this.locationComponent.current_bet < this.current_min_raise) {

      //COMMENT OUT TO FIND BUGS
      if (player_index == 0)

        alert("Minimum raise is currently " + this.current_min_raise + ".");
      return 0;
    } else { //RAISE
      this.locationComponent.players[player_index].status = "CALL";

      var old_current_bet = this.locationComponent.current_bet;
      this.locationComponent.current_bet = this.locationComponent.players[player_index].subtotal_bet + bet_amount;

      if (this.get_pot_size() > 0) {
        this.current_min_raise = this.locationComponent.current_bet - old_current_bet;
        if (this.current_min_raise < this.BIG_BLIND) this.current_min_raise = this.BIG_BLIND;
      }
    }
    this.locationComponent.players[player_index].subtotal_bet += bet_amount;
    this.locationComponent.players[player_index].bankroll -= bet_amount;
    this.write_basic_general();
    return 1;
  }


  pix_index = 0;
  pix = this.get_base_deck();
  preload_a = new Image();
  preload_b = new Image();
  preload_c = new Image();
  preload_d = new Image();
  preload_e = new Image();

  get_base_deck() {
    var n = Math.floor(Math.random() * 4);
    if (n < 1) return ['assets/game-images/d.gif'];
    if (n < 2) return ['assets/game-images/c.gif'];
    if (n < 3) return ['assets/game-images/s.gif'];
    return ['assets/game-images/h.gif'];
  }

  preload_pix() {
    var i = this.pix_index;
    if (++i >= this.pix.length) i = 0;
    this.preload_a.src = this.pix[i];
    if (++i >= this.pix.length) i = 0;
    this.preload_b.src = this.pix[i];
    if (++i >= this.pix.length) i = 0;
    this.preload_c.src = this.pix[i];
    if (++i >= this.pix.length) i = 0;
    this.preload_d.src = this.pix[i];
    if (++i >= this.pix.length) i = 0;
    this.preload_e.src = this.pix[i];
  }

  reset_player_statuses(type) {
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      if (type == 0) this.locationComponent.players[i].status = "";
      else if (type == 1 && this.locationComponent.players[i].status != "BUST") this.locationComponent.players[i].status = "";
      else if (type == 2 && this.locationComponent.players[i].status != "FOLD" && this.locationComponent.players[i].status != "BUST") this.locationComponent.players[i].status = "";
    }
  }

  clear_bets() {
    for (var i = 0; i < this.locationComponent.players.length; i++)
      this.locationComponent.players[i].subtotal_bet = 0;
    this.locationComponent.current_bet = 0;
  }

  clear_pot() {
    for (var i = 0; i < this.locationComponent.players.length; i++)
      this.locationComponent.players[i].total_bet = 0;
  }

  collect_cards() {
    this.board = new Array(5);
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      this.locationComponent.players[i].carda = "";
      this.locationComponent.players[i].cardb = "";
    }
  }

  get_next_player_position(i, delta) {
    var j = 0,
      step = 1;
    if (delta < 0) step = -1;
    while (1) {
      i += step;
      if (i >= this.locationComponent.players.length) i = 0;
      else if (i < 0) i = this.locationComponent.players.length - 1;
      if (this.locationComponent.players[i].status == "BUST" || this.locationComponent.players[i].status == "FOLD" || ++j < delta) { } else break;
    }
    return i;
  }

  BG_COLOR = "006600";
  BG_HILITE = "EFEF30";
  SUIT_LINK = "http://google.com/";

  write_player(n, hilite, show_cards, mode) {
    var carda = "",
      cardb = "";
    var base_background = this.BG_COLOR;
    if (hilite == 1) base_background = this.BG_HILITE;
    else if (hilite == 2) base_background = "FF0000";
    if (this.locationComponent.players[n].status == "FOLD") base_background = "999999";
    var background = " background=cardback.gif";
    var background_a = "";
    var background_b = "";
    var background_color_a = base_background;
    var background_color_b = base_background;
    if (this.locationComponent.players[n].carda) {
      background_a = background;
      if (n == 0 || (show_cards && this.locationComponent.players[n].status != "FOLD")) {
        background_a = "";
        background_color_a = "FFFFFF";
        carda = this.get_card_html(this.locationComponent.players[n].carda);
      }
    }
    if (this.locationComponent.players[n].cardb) {
      background_b = background;
      if (n == 0 || (show_cards && this.locationComponent.players[n].status != "FOLD")) {
        background_b = "";
        background_color_b = "FFFFFF";
        cardb = this.get_card_html(this.locationComponent.players[n].cardb);
      }
    }
    var button = "";
    if (n == this.locationComponent.button_index) button = "<font color=FFFFFF>@</font>";
    var bet_text = "";
    var allin = "bet:";
    if (!this.has_money(n)) allin = "<font color=FF0000>ALL IN:</font>";
    if (mode != 1 || this.locationComponent.players[n].subtotal_bet > 0 || this.locationComponent.players[n].status == "CALL")
      bet_text = "<b><font size=+2>" + allin + " <font color=00EE00>" + this.locationComponent.players[n].subtotal_bet + "</font></font></b>";
    else if (!this.has_money(n) && this.locationComponent.players[n].status != "FOLD" && this.locationComponent.players[n].status != "BUST")
      bet_text = "<b><font size=+2 color=FF0000>ALL IN</font></b>";
    if (this.locationComponent.players[n].status == "FOLD")
      bet_text = "<b><font size=+2>FOLDED</font></b>";
    else if (this.locationComponent.players[n].status == "BUST")
      bet_text = "<b><font size=+2 color=FF0000>BUSTED</font></b>";

    var html = "<html><body bgcolor=" + base_background + " topmargin=4 bottommargin=0><pre><b><font size=+2>" + button + this.locationComponent.players[n].name + "</font></b>" +
      " [" + this.locationComponent.players[n].bankroll + "]" +
      "<font size=-1 face=times color=" + base_background + ">\nCHEAT! " + this.locationComponent.players[n].carda.substring(0, 1) + this.make_readable_rank(this.locationComponent.players[n].carda.substring(1)) + " " + this.locationComponent.players[n].cardb.substring(0, 1) + this.make_readable_rank(this.locationComponent.players[n].cardb.substring(1)) + "\n</font>" +
      "<center><table bgcolor=" + base_background + " height=87 width=130><tr align=center><td bgcolor=" + background_color_a + " width=50%" + background_a + ">" + carda + "</td><td></td><td  bgcolor=" + background_color_b + " width=50%" + background_b + ">" + cardb + "</td></tr></table><small>"

    if (navigator.userAgent.indexOf("MSIE") > -1) html += "\n"; //FF
    html += "\n</small>" + bet_text + "</center></pre></body></html>";
    //return "player" + n;
    this.write_frame("player" + n, html, "");
  }

  get_card_html(card) {
    var suit = card.substring(0, 1);
    var color = "FF0000";
    if (suit == "c" || suit == "s") color = "000000";
    var r = card.substring(1);
    var rank = this.make_readable_rank(r);
    return "<font size=+2 color=" + color + "><b>" + rank + "</b></font> <a href='" + this.SUIT_LINK + "' target=_blank><img src=" + suit + ".gif border=0 title=" + suit + " alt=" + suit + "></a>";
  }

  make_readable_rank(r) {
    if (r < 11) return r;
    else if (r == 11) return "J";
    else if (r == 12) return "Q";
    else if (r == 13) return "K";
    else if (r == 14) return "A";
  }

  write_frame(f: any, html: any, n: any): void {
    try {
      console.log("type of component  " + f);
      frames[f].document.open("text/html", "replace");
      frames[f].document.write(html);
      frames[f].document.close();
      var u = navigator.userAgent;
      if (u.indexOf("Opera") < 0 && u.indexOf("Safari") < 0 && u.indexOf("MSIE") > -1) frames[f].location.reload();
    } catch (e) { //FF
      if (!n) n = 0;
      //if (n < 9)
      // this.write_frame(f, html, ++n);
    }
  }

  compRan() {
    return .5 - Math.random();
  }


  deal_and_write_a() {
    var pause_time = 0;
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      var j = this.get_next_player_position(this.locationComponent.button_index, 1 + i);
      if (this.locationComponent.players[j].carda) break;
      this.locationComponent.players[j].carda = this.locationComponent.cards[this.deck_index++];

      /*
      players[0].carda="d6";
      players[1].carda="h7";
      players[2].carda="s14";
      players[3].carda="d7";
      players[4].carda="h9";
      //*/

      setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.locationComponent.speed);
      pause_time += 550;
    }
    setTimeout(() => this.deal_and_write_b(), pause_time * this.locationComponent.speed);
  }

  deal_and_write_b() {
    var pause_time = 0;
    for (var i = 0; i < this.locationComponent.players.length; i++) {
      var j = this.get_next_player_position(this.locationComponent.button_index, 1 + i);
      if (this.locationComponent.players[j].cardb) break;
      this.locationComponent.players[j].cardb = this.locationComponent.cards[this.deck_index++];

      /*
      players[0].cardb="h11";
      players[1].cardb="c2";
      players[2].cardb="c14";
      players[3].cardb="d12";
      players[4].cardb="s11";
      //*/

      setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.locationComponent.speed);
      pause_time += 550;
    }
    setTimeout(() => this.main(), pause_time * this.locationComponent.speed);
  }

  get_pot_size() {
    var p = 0;
    for (var i = 0; i < this.locationComponent.players.length; i++)
      p += this.locationComponent.players[i].total_bet + this.locationComponent.players[i].subtotal_bet;
    return p;
  }

  write_basic_general() {
    this.write_frame("general", "<html><body topmargin=2 bottommargin=0 bgcolor=" + this.BG_COLOR + "><table><tr><td>" + this.get_pot_size_html() + "</td></tr></table></body></html>", "");
  }

  get_pot_size_html() {
    return "<font color=00EE00 size=+4><b>TOTAL POT: " + this.get_pot_size() + "</b></font>";
  }

  main() {
    var increment_bettor_index = 0;
    if (this.locationComponent.players[this.current_bettor_index].status == "BUST" || this.locationComponent.players[this.current_bettor_index].status == "FOLD") {
      increment_bettor_index = 1;
    } else if (!this.has_money(this.current_bettor_index)) {
      this.locationComponent.players[this.current_bettor_index].status = "CALL";
      increment_bettor_index = 1;
    } else if (this.locationComponent.players[this.current_bettor_index].status == "CALL" && this.locationComponent.players[this.current_bettor_index].subtotal_bet == this.locationComponent.current_bet) {
      increment_bettor_index = 1;
    } else {
      this.locationComponent.players[this.current_bettor_index].status = "";
      if (this.current_bettor_index == 0) {
        var call_button_text = "     Call     ";
        var fold_button = "<input type=button value=Fold onclick='parent.human_fold()'>";
        var bet_button_text = "   Raise   ";
        var to_call = this.locationComponent.current_bet - this.locationComponent.players[0].subtotal_bet;
        if (to_call > this.locationComponent.players[0].bankroll) to_call = this.locationComponent.players[0].bankroll;
        if (to_call == 0) {
          call_button_text = "   Check   ";
          fold_button = "";
          bet_button_text = "     Bet     ";
        }
        var quick_values = new Array(6);
        if (to_call < this.locationComponent.players[0].bankroll) quick_values[0] = this.current_min_raise;
        var quick_start = quick_values[0];
        if (quick_start < 20) quick_start = 20;
        else quick_start = this.current_min_raise + 20;
        for (var i = 0; i < 5; i++) { if (quick_start + 20 * i < this.locationComponent.players[0].bankroll) quick_values[i + 1] = quick_start + 20 * i; }
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
        quick_bets += "<a href='javascript:parent.handle_human_bet(" + this.locationComponent.players[0].bankroll + ")'>All In!</a>" +
          "<form onsubmit='parent.handle_human_bet(b.value);return false;'><font size=+2>&nbsp;</font><input type=text size=4 name=b><input type=submit value=" + bet_or_raise + "></form>";
        var html = "<html><body vlink=0000FF topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.c.focus();'><table width=100%><tr><td colspan=2>" + this.get_pot_size_html() +
          "</td></tr><tr><td><font size=+2><b>Current total bet: " + this.locationComponent.current_bet + "</b><br> You need <font color=FF0000 size=+3>" + to_call + "</font> more to call.</font>" +
          "<form name=f><input name=c type=button value='" + call_button_text + "' onclick='parent.human_call()'><input type=button value='" + bet_button_text + "' onclick='parent.human_raise()'>" + fold_button +
          "</form></td><td valign=bottom><table" + quick_color + "><tr><td align=center>" + quick_bets + "</td></tr></table></td></tr></table></body></html>";
        this.write_player(0, 1, 0, 1);
        this.write_frame("general", html, "");
        return;
      } else {
        this.write_player(this.current_bettor_index, 1, 0, 1);
        setTimeout("bot_bet(" + this.current_bettor_index + ")", 777 * this.locationComponent.speed);
        return;
      }
    }
    var can_break = true;
    for (var j = 0; j < this.locationComponent.players.length; j++) {
      var s = this.locationComponent.players[j].status;
      if (s == "OPTION") {
        can_break = false;
        break;
      }
      if (s != "BUST" && s != "FOLD") {
        if (this.has_money(j) && this.locationComponent.players[j].subtotal_bet < this.locationComponent.current_bet) {
          can_break = false;
          break;
        }
      }
    }
    if (increment_bettor_index)
      this.current_bettor_index = this.get_next_player_position(this.current_bettor_index, 1);
    if (can_break)
      setTimeout("ready_for_next_card()", 999 * this.locationComponent.speed);
    else this.main();
  }

}
