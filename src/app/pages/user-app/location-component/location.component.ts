import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandService } from './@core/hand.service';
import { BotService } from './@core/bot.service';
import { Player, PlayerDataService } from './@core/player-data.service';
import { Subscription } from 'rxjs';


@Component({
  moduleId: 'module.id',
  selector: 'user-location-root',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

//holdem.js
export class LocationComponent implements OnInit {
  BG_COLOR = "006600";
  BACK_HOME = "CDB Home";
  BACK_HOME_LINK = "http://deathbeeper.com/";
  SUIT_LINK = "http://google.com/";
  START_DATE;
  NUM_ROUNDS;
  STOP_AUTOPLAY = 0;
  RUN_EM = 0;
  STARTING_BANKROLL = 500;
  SMALL_BLIND;
  BIG_BLIND;
  BG_HILITE = "EFEF30";
  speed = 1;
  HUMAN_WINS_AGAIN;
  cards = new Array(52);
  players;
  board;
  deck_index;
  button_index;
  current_bettor_index;
  current_bet;
  current_min_raise;
  name;
  bankroll;
  carda;
  cardb;
  status;
  total_bet;
  subtotal_bet;
  pauseTime=0;
  
  constructor(private botService: BotService,private playerDataService:PlayerDataService) { }

  ngOnInit() {
    this.preload_base_pix();//doing no function call
    //this.write_settings_frame(); //calling write_frame call for setting
    this.make_deck(); //doing no function call
    this.new_game();//initialising the players ,in this.players array all the players we have.
    this.write_frame("board2", "<html><body bgcolor=" + this.BG_COLOR + " text=FFFFFF><table height=100%><tr><td valign=center><tt><b>Hello!</b> This software is still being improved. The opponent bots need to be smarter. If it isn't challenging now, hopefully it will be soon. And please visit some of our sponsors' links. <small><i>February 2006</i></small></tt></td></tr></table></body></html>", "");
  }

  a(d) {
    this.init_pix(d)
  }

  make_deck() {
    var i, j = 0;
    for (i = 2; i < 15; i++) {
      this.cards[j++] = "h" + i;
      this.cards[j++] = "d" + i;
      this.cards[j++] = "c" + i;
      this.cards[j++] = "s" + i;
    }
  }

  my_players = [
    new Player("Stan Deman", 0, "", "", "", 0, 0),
    new Player("Karth Kerai", 0, "", "", "", 0, 0),
    new Player("Tonya Bonya", 0, "", "", "", 0, 0),
    new Player("Stan Deman", 0, "", "", "", 0, 0)
  ];

  new_game() {
    this.START_DATE = new Date();
    this.NUM_ROUNDS = 0;
    this.HUMAN_WINS_AGAIN = 0;
    this.write_frame("general", "<html><body bgcolor=" + this.BG_COLOR + "></body></html>", "");

    this.players = new Array(this.my_players.length + 1);
    var player_name = this.getCookie("playername");
    if (!player_name) player_name = "You";
    this.players[0] = new Player(player_name, 0, "", "", "", 0, 0);
    this.my_players.sort(this.compRan);

    //here we are adding the new palyer and other players in this.players
    for (var i = 1; i < this.players.length; i++) {
      this.players[i] = this.my_players[i - 1];
    }
    this.reset_player_statuses(0);
    this.clear_bets();

    //assigning the money to the players
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].bankroll = this.STARTING_BANKROLL;
    }

    this.button_index = Math.floor(Math.random() * this.players.length);
    this.new_round();
  }

  //who are the players are eligible to play
  new_round() {
    this.RUN_EM = 0;
    this.NUM_ROUNDS++;
    var num_playing = 0;
    for (var i = 0; i < this.players.length; i++) {
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
    this.button_index = this.playerDataService.get_next_player_position(this.button_index, 1,this.players);

    for (var i = 0; i < this.players.length; i++) this.write_player(i, 0, 0, 1);
    for (var i = 0; i < this.board.length; i++) this.write_frame("board" + i, "<html><body bgcolor=" + this.BG_COLOR + "></body></html>", "");

    if (this.NUM_ROUNDS > 1) {
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

  collect_cards() {
    this.board = new Array(5);
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].carda = "";
      this.players[i].cardb = "";
    }
  }

  shuffle() {
    this.deck_index = 0;
    this.cards.sort(this.compRan);
  }

  blinds_and_deal() {
    this.SMALL_BLIND = 5;
    this.BIG_BLIND = 10;
    var num_playing = 0;
    for (var i = 0; i < this.players.length; i++) {
      if (this.has_money(i)) num_playing += 1;
    }
    if (num_playing == 3) {
      this.SMALL_BLIND = 10;
      this.BIG_BLIND = 20;
    } else if (num_playing < 3) {
      this.SMALL_BLIND = 25;
      this.BIG_BLIND = 50;
    }
    var small_blind = this.playerDataService.get_next_player_position(this.button_index, 1,this.players);
    this.bet(small_blind, this.SMALL_BLIND);
    this.write_player(small_blind, 0, 0, 0);
    var big_blind = this.playerDataService.get_next_player_position(small_blind, 1,this.players);
    this.bet(big_blind, this.BIG_BLIND);
    this.write_player(big_blind, 0, 0, 0);
    this.players[big_blind].status = "OPTION";
    this.current_bettor_index = this.playerDataService.get_next_player_position(big_blind, 1,this.players);
    setTimeout(() => {
        this.playerDataService.deal_and_write_a(this.button_index,this.players,this.deck_index,this.cards,this.speed);
    },3000);
  }

  

  

  deal_flop() {
    var pause_time = 777;
    for (var i = 0; i < 3; i++)
      this.board[i] = this.cards[this.deck_index++];

    /*
    board[0]="c13";
    board[1]="c6";
    board[2]="d11";
    //*/

    setTimeout("this.write_board('0')", (pause_time + 100) * this.speed);
    setTimeout("this.write_board('1')", (pause_time + 250) * this.speed);
    setTimeout("this.write_board('2')", (pause_time + 400) * this.speed);
    if (this.get_num_betting() > 1) setTimeout(() => this.main(), (pause_time + 1000) * this.speed);
    else setTimeout("ready_for_next_card()", 999 * this.speed);
  }

  deal_fourth() {
    var pause_time = 777;
    this.board[3] = this.cards[this.deck_index++];

    //board[3]="c9";

    setTimeout("this.write_board('3')", (pause_time + 100) * this.speed);
    if (this.get_num_betting() > 1)
      setTimeout(() => this.main(), 2000 * this.speed);
    else
      setTimeout(this.ready_for_next_card(), 999 * this.speed);
  }

  deal_fifth() {
    var pause_time = 777;
    this.board[4] = this.cards[this.deck_index++];

    //board[4]="c10";

    setTimeout("write_board('4')", (pause_time + 100) * this.speed);
    if (this.get_num_betting() > 1)
      setTimeout(() => this.main(), 2000 * this.speed);
    else
      setTimeout("ready_for_next_card()", 999 * this.speed);
  }

  write_board(n) {
    var pic = this.get_next_pic();
    var pic_click = "http://google.com/";
    if (this.pix.length < 50) {
      pic = this.board[n].substring(0, 1) + ".gif";
      pic_click = this.SUIT_LINK;
    }
    this.write_frame("board" + n, "<html><body bgcolor=" + this.BG_COLOR + " leftmargin=3><table width=100% bgcolor=FFFFFF><tr><td valign=top>" +
      this.get_card_html(this.board[n]) + "</td></tr></table><a href=\"" + pic_click + "\" target=_blank><img border=0 width=100% src='" +
      pic + "'></a><br><table width=100% height=100% bgcolor=FFFFFF><tr><td></td></tr></table></body></html>", "");
  }



  main() {
    var increment_bettor_index = 0;
    if (this.players[this.current_bettor_index].status == "BUST" || this.players[this.current_bettor_index].status == "FOLD") {
      increment_bettor_index = 1;
    } else if (!this.has_money(this.current_bettor_index)) {
      this.players[this.current_bettor_index].status = "CALL";
      increment_bettor_index = 1;
    } else if (this.players[this.current_bettor_index].status == "CALL" && this.players[this.current_bettor_index].subtotal_bet == this.current_bet) {
      increment_bettor_index = 1;
    } else {
      this.players[this.current_bettor_index].status = "";
      if (this.current_bettor_index == 0) {
        var call_button_text = "     Call     ";
        var fold_button = "<input type=button value=Fold onclick='parent.human_fold()'>";
        var bet_button_text = "   Raise   ";
        var to_call = this.current_bet - this.players[0].subtotal_bet;
        if (to_call > this.players[0].bankroll) to_call = this.players[0].bankroll;
        if (to_call == 0) {
          call_button_text = "   Check   ";
          fold_button = "";
          bet_button_text = "     Bet     ";
        }
        var quick_values = new Array(6);
        if (to_call < this.players[0].bankroll) quick_values[0] = this.current_min_raise;
        var quick_start = quick_values[0];
        if (quick_start < 20) quick_start = 20;
        else quick_start = this.current_min_raise + 20;
        for (var i = 0; i < 5; i++) { if (quick_start + 20 * i < this.players[0].bankroll) quick_values[i + 1] = quick_start + 20 * i; }
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
        quick_bets += "<a href='javascript:parent.handle_human_bet(" + this.players[0].bankroll + ")'>All In!</a>" +
          "<form onsubmit='parent.handle_human_bet(b.value);return false;'><font size=+2>&nbsp;</font><input type=text size=4 name=b><input type=submit value=" + bet_or_raise + "></form>";
        var html = "<html><body vlink=0000FF topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.c.focus();'><table width=100%><tr><td colspan=2>" + this.get_pot_size_html() +
          "</td></tr><tr><td><font size=+2><b>Current total bet: " + this.current_bet + "</b><br> You need <font color=FF0000 size=+3>" + to_call + "</font> more to call.</font>" +
          "<form name=f><input name=c type=button value='" + call_button_text + "' onclick='parent.human_call()'><input type=button value='" + bet_button_text + "' onclick='parent.human_raise()'>" + fold_button +
          "</form></td><td valign=bottom><table" + quick_color + "><tr><td align=center>" + quick_bets + "</td></tr></table></td></tr></table></body></html>";
        this.write_player(0, 1, 0, 1);
        this.write_frame("general", html, "");
        return;
      } else {
        this.write_player(this.current_bettor_index, 1, 0, 1);
        setTimeout("bot_bet(" + this.current_bettor_index + ")", 777 * this.speed);
        return;
      }
    }
    var can_break = true;
    for (var j = 0; j < this.players.length; j++) {
      var s = this.players[j].status;
      if (s == "OPTION") {
        can_break = false;
        break;
      }
      if (s != "BUST" && s != "FOLD") {
        if (this.has_money(j) && this.players[j].subtotal_bet < this.current_bet) {
          can_break = false;
          break;
        }
      }
    }
    if (increment_bettor_index)
      this.current_bettor_index = this.playerDataService.get_next_player_position(this.current_bettor_index, 1, this.players);
    if (can_break)
      setTimeout("ready_for_next_card()", 999 * this.speed);
    else this.main();
  }

  handle_end_of_round() {
    // var candidates = new Array(this.players.length);
    // var allocations = new Array(this.players.length);
    // var my_total_bets_per_player = new Array(this.players.length);
    // for (var i = 0; i < candidates.length; i++) {
    //   allocations[i] = 0;
    //   my_total_bets_per_player[i] = this.players[i].total_bet;
    //   if (this.players[i].status != "FOLD" && this.players[i].status != "BUST") candidates[i] = this.players[i];
    // }

    // var my_total_pot_size = this.get_pot_size();
    // var my_best_hand_name = "";
    // var best_hand_players;
    // while (1) {
    //   var winners = this.handComponent.get_winners(candidates);
    //   if (!my_best_hand_name) {
    //     my_best_hand_name = this.handComponent.get_last_winning_hand_name();
    //     best_hand_players = winners;

    //     if (winners[0]) this.HUMAN_WINS_AGAIN++;
    //     else this.HUMAN_WINS_AGAIN = 0;

    //   }
    //   if (!winners) break;

    //   var lowest_in_for = my_total_pot_size * 2;
    //   var num_winners = 0;
    //   for (var i = 0; i < winners.length; i++) {
    //     if (!winners[i]) continue;
    //     num_winners++;
    //     if (my_total_bets_per_player[i] < lowest_in_for) lowest_in_for = my_total_bets_per_player[i];
    //   }

    //   var my_pot = 0;
    //   for (var i = 0; i < this.players.length; i++) {
    //     if (lowest_in_for >= my_total_bets_per_player[i]) {
    //       my_pot += my_total_bets_per_player[i];
    //       my_total_bets_per_player[i] = 0;
    //     } else {
    //       my_pot += lowest_in_for;
    //       my_total_bets_per_player[i] -= lowest_in_for;
    //     }
    //   }

    //   var share = my_pot / num_winners;
    //   for (var i = 0; i < winners.length; i++) {
    //     if (my_total_bets_per_player[i] < .01) candidates[i] = null;
    //     if (!winners[i]) continue;
    //     allocations[i] += share;
    //     my_total_pot_size -= share;
    //   }
    // }

    // var winner_text = "";
    // var human_loses = 0;
    // for (var i = 0; i < allocations.length; i++) {
    //   if (allocations[i] > 0) {
    //     var a_string = "" + allocations[i];
    //     var dot_index = a_string.indexOf(".");
    //     if (dot_index > 0) {
    //       a_string = "" + a_string + "00";
    //       let add_dot_index: any = dot_index + 3;
    //       let add_Sub_String: any = a_string.substring(0, add_dot_index);
    //       allocations[i] = add_Sub_String - 0;
    //     }
    //     winner_text += allocations[i] + " to " + this.players[i].name + ". ";
    //     this.players[i].bankroll += allocations[i];
    //     if (best_hand_players[i]) this.write_player(i, 2, 1, 0);
    //     else this.write_player(i, 1, 1, 0);
    //   } else {
    //     if (!this.has_money(i) && this.players[i].status != "BUST") {
    //       this.players[i].status = "BUST";
    //       if (i == 0) human_loses = 1;
    //     }
    //     if (this.players[i].status != "FOLD") this.write_player(i, 0, 1, 0);
    //   }
    // }

    // var detail = "";
    // for (var i = 0; i < this.players.length; i++) {
    //   detail += this.players[i].name + " bet " + this.players[i].total_bet + " & got " + allocations[i] + ".\\n";
    // }
    // detail = " (<a href='javascript:alert(\"" + detail + "\")'>details</a>)";

    // var hilite_a = " name=c",
    //   hilite_b = "";
    // if (human_loses) { hilite_a = "", hilite_b = " name=c"; }
    // var the_buttons = "<input" + hilite_a + " type=button value='Continue Game' onclick='parent.new_round()'><input" + hilite_b + " type=button value='Restart Game' onclick='parent.confirm_new()'>";
    // if (this.players[0].status == "BUST" && !human_loses) {
    //   the_buttons = "<input name=c type=button value='Restart Game' onclick='parent.STOP_AUTOPLAY=1'>";
    //   setTimeout("autoplay_new_round()", 1500 + 1100 * this.speed);
    // }

    // var html = "<html><body topmargin=2 bottommargin=0 bgcolor=" + this.BG_HILITE + " onload='document.f.c.focus();'><table><tr><td>" + this.get_pot_size_html() +
    //   "</td></tr></table><br><font size=+2 color=FF0000><b>WINNER! " + my_best_hand_name + ". " + winner_text + "</b></font>" + detail + "<br>" +
    //   "<form name=f>" + the_buttons + "<input type=button value=Quit onclick='parent.confirm_quit()'></form></body></html>";
    // this.write_frame("general", html, "");
    // let date: any = new Date();
    // var elapsed_seconds = (date - this.START_DATE) / 1000;
    // var elapsed_minutes: any = "" + (elapsed_seconds / 60);
    // var dot_i = elapsed_minutes.indexOf(".");
    // if (dot_i > 0) elapsed_minutes = elapsed_minutes.substring(0, dot_i);
    // var and_seconds = "" + (elapsed_seconds - elapsed_minutes * 60);
    // dot_i = and_seconds.indexOf(".");
    // if (dot_i > 0) and_seconds = and_seconds.substring(0, dot_i);

    // if (human_loses == 1) alert("Sorry, you busted, " + this.players[0].name + ".\n\n" + elapsed_minutes + " minutes " + and_seconds + " seconds, " + this.NUM_ROUNDS + " deals.");
    // else {
    //   var num_playing = 0;
    //   for (var i = 0; i < this.players.length; i++) { if (this.has_money(i)) num_playing += 1; }
    //   if (num_playing < 2) {
    //     var end_msg = "GAME OVER!";
    //     if (this.has_money(0)) end_msg += "\n\nYOU WIN " + this.players[0].name.toUpperCase() + "!!!";
    //     else end_msg += "\n\nSorry you lost.";
    //     alert(end_msg + "\n\nThis game lasted " + elapsed_minutes + " minutes " + and_seconds + " seconds, " + this.NUM_ROUNDS + " deals.");
    //   }
    // }
  }

  autoplay_new_round() {
    if (this.STOP_AUTOPLAY > 0) {
      this.STOP_AUTOPLAY = 0;
      this.new_game();
    } else
      this.new_round();
  }

  ready_for_next_card() {
    var num_betting = this.get_num_betting();
    for (var i = 0; i < this.players.length; i++) { this.players[i].total_bet += this.players[i].subtotal_bet; }
    this.clear_bets();
    if (this.board[4]) {
      this.handle_end_of_round();
      return;
    }
    this.current_min_raise = this.BIG_BLIND;
    this.reset_player_statuses(2);
    if (this.players[this.button_index].status == "FOLD") this.players[this.playerDataService.get_next_player_position(this.button_index, -1,this.players)].status = "OPTION";
    else this.players[this.button_index].status = "OPTION";
    this.current_bettor_index = this.playerDataService.get_next_player_position(this.button_index, 1, this.players);
    var show_cards = 0;
    if (num_betting < 2) show_cards = 1;

    if (!this.RUN_EM)
      for (var i = 0; i < this.players.length; i++)
        if (this.players[i].status != "BUST" && this.players[i].status != "FOLD") this.write_player(i, 0, show_cards, 1);

    if (num_betting < 2) this.RUN_EM = 1;
    if (!this.board[0]) this.deal_flop();
    else if (!this.board[3]) this.deal_fourth();
    else if (!this.board[4]) this.deal_fifth();
  }

  bet(player_index, bet_amount) {
    if (this.players[player_index].status == "FOLD") { } //FOLD
    else if (bet_amount >= this.players[player_index].bankroll) { //ALL IN
      bet_amount = this.players[player_index].bankroll;

      var old_current_bet = this.current_bet;

      if (this.players[player_index].subtotal_bet + bet_amount > this.current_bet)
        this.current_bet = this.players[player_index].subtotal_bet + bet_amount;

      var new_current_min_raise = this.current_bet - old_current_bet;
      if (new_current_min_raise > this.current_min_raise) this.current_min_raise = new_current_min_raise;

      this.players[player_index].status = "CALL";
    } else if (bet_amount + this.players[player_index].subtotal_bet == this.current_bet) { //CALL
      this.players[player_index].status = "CALL";
    } else if (this.current_bet > this.players[player_index].subtotal_bet + bet_amount) { //2 SMALL

      //COMMENT OUT TO FIND BUGS
      if (player_index == 0)

        alert("The current bet to match is " + this.current_bet + "." +
          "\nYou must bet a total of at least " + (this.current_bet - this.players[player_index].subtotal_bet) + " or fold.");
      return 0;
    } else if (bet_amount + this.players[player_index].subtotal_bet > this.current_bet //RAISE 2 SMALL
      &&
      this.get_pot_size() > 0 &&
      bet_amount + this.players[player_index].subtotal_bet - this.current_bet < this.current_min_raise) {

      //COMMENT OUT TO FIND BUGS
      if (player_index == 0)

        alert("Minimum raise is currently " + this.current_min_raise + ".");
      return 0;
    } else { //RAISE
      this.players[player_index].status = "CALL";

      var old_current_bet = this.current_bet;
      this.current_bet = this.players[player_index].subtotal_bet + bet_amount;

      if (this.get_pot_size() > 0) {
        this.current_min_raise = this.current_bet - old_current_bet;
        if (this.current_min_raise < this.BIG_BLIND) this.current_min_raise = this.BIG_BLIND;
      }
    }
    this.players[player_index].subtotal_bet += bet_amount;
    this.players[player_index].bankroll -= bet_amount;
    this.write_basic_general();
    return 1;
  }

  // human_call() {
  //   this.players[0].status = "CALL";
  //   this.current_bettor_index = this.get_next_player_position(0, 1);
  //   this.bet(0, this.current_bet - this.players[0].subtotal_bet);
  //   this.write_player(0, 0, 0, 0);
  //   //write_ad();
  //   this.main();
  // }

  // human_raise() {
  //   var to_call = this.current_bet - this.players[0].subtotal_bet;
  //   var prompt_text = "Minimum raise is " + this.current_min_raise + ". How much do you raise? DON'T include the " + to_call + " needed to call.";
  //   if (to_call == 0) prompt_text = "The minimum bet is " + this.current_min_raise + ". How much you wanna bet?";
  //   var bet_amount = prompt(prompt_text, "");
  //   if (bet_amount == null) return;
  //   this.handle_human_bet(bet_amount);
  // }

  // handle_human_bet(bet_amount) {
  //   bet_amount = "" + bet_amount;
  //   var m;
  //   for (var i = 0; i < bet_amount.length; i++) {
  //     var c = bet_amount.substring(i, i + 1);
  //     if (c == "0" || c > 0) m += "" + c;
  //   }
  //   if (m == "") return;
  //   bet_amount = m - 0;
  //   if (bet_amount < 0 || isNaN(bet_amount)) bet_amount = 0;
  //   var to_call = this.current_bet - this.players[0].subtotal_bet;
  //   bet_amount += to_call;
  //   var is_ok_bet = this.bet(0, bet_amount);
  //   if (is_ok_bet) {
  //     this.players[0].status = "CALL";
  //     this.current_bettor_index = this.get_next_player_position(0, 1);
  //     this.write_player(0, 0, 0, 0);
  //     // write_ad();
  //     this.main();
  //   }
  // }

  // human_fold() {
  //   this.players[0].status = "FOLD";
  //   this.current_bettor_index = this.get_next_player_position(0, 1);
  //   this.write_player(0, 0, 0, 0);
  //   this.write_basic_general();
  //   //write_ad();
  //   this.main();
  // }

  // bot_bet(x) {
  //   var b = 0;
  //   var n = this.current_bet - this.players[x].subtotal_bet;
  //   if (!this.board[0]) b = this.botService.get_preflop_bet();
  //   // else b = this.botService.get_postflop_bet();
  //   if (b >= this.players[x].bankroll) //ALL IN
  //     this.players[x].status = "";
  //   else if (b < n) { //BET 2 SMALL
  //     b = 0;
  //     this.players[x].status = "FOLD";
  //   } else if (b == n) { //CALL
  //     this.players[x].status = "CALL";
  //   } else if (b > n) {
  //     if (b - n < this.current_min_raise) { //RAISE 2 SMALL
  //       b = n;
  //       this.players[x].status = "CALL";
  //     } else this.players[x].status = ""; //RAISE
  //   }
  //   if (this.bet(x, b) == 0) {
  //     this.players[x].status = "FOLD";
  //     this.bet(x, 0);
  //   }
  //   this.write_player(this.current_bettor_index, 0, 0, 0);
  //   this.current_bettor_index = this.get_next_player_position(this.current_bettor_index, 1);
  //   this.main();
  // }

  write_player(n, hilite, show_cards, mode) {
    var carda = "",
      cardb = "";
    var base_background = this.BG_COLOR;
    if (hilite == 1) base_background = this.BG_HILITE;
    else if (hilite == 2) base_background = "FF0000";
    if (this.players[n].status == "FOLD") base_background = "999999";
    var background = " background=cardback.gif";
    var background_a = "";
    var background_b = "";
    var background_color_a = base_background;
    var background_color_b = base_background;
    if (this.players[n].carda) {
      background_a = background;
      if (n == 0 || (show_cards && this.players[n].status != "FOLD")) {
        background_a = "";
        background_color_a = "FFFFFF";
        carda = this.get_card_html(this.players[n].carda);
      }
    }
    if (this.players[n].cardb) {
      background_b = background;
      if (n == 0 || (show_cards && this.players[n].status != "FOLD")) {
        background_b = "";
        background_color_b = "FFFFFF";
        cardb = this.get_card_html(this.players[n].cardb);
      }
    }
    var button = "";
    if (n == this.button_index) button = "<font color=FFFFFF>@</font>";
    var bet_text = "";
    var allin = "bet:";
    if (!this.has_money(n)) allin = "<font color=FF0000>ALL IN:</font>";
    if (mode != 1 || this.players[n].subtotal_bet > 0 || this.players[n].status == "CALL")
      bet_text = "<b><font size=+2>" + allin + " <font color=00EE00>" + this.players[n].subtotal_bet + "</font></font></b>";
    else if (!this.has_money(n) && this.players[n].status != "FOLD" && this.players[n].status != "BUST")
      bet_text = "<b><font size=+2 color=FF0000>ALL IN</font></b>";
    if (this.players[n].status == "FOLD")
      bet_text = "<b><font size=+2>FOLDED</font></b>";
    else if (this.players[n].status == "BUST")
      bet_text = "<b><font size=+2 color=FF0000>BUSTED</font></b>";

    var html = "<html><body bgcolor=" + base_background + " topmargin=4 bottommargin=0><pre><b><font size=+2>" + button + this.players[n].name + "</font></b>" +
      " [" + this.players[n].bankroll + "]" +
      "<font size=-1 face=times color=" + base_background + ">\nCHEAT! " + this.players[n].carda.substring(0, 1) + this.make_readable_rank(this.players[n].carda.substring(1)) + " " + this.players[n].cardb.substring(0, 1) + this.make_readable_rank(this.players[n].cardb.substring(1)) + "\n</font>" +
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

  get_pot_size_html() {
    return "<font color=00EE00 size=+4><b>TOTAL POT: " + this.get_pot_size() + "</b></font>";
  }

  get_pot_size() {
    var p = 0;
    for (var i = 0; i < this.players.length; i++)
      p += this.players[i].total_bet + this.players[i].subtotal_bet;
    return p;
  }

  clear_bets() {
    for (var i = 0; i < this.players.length; i++)
      this.players[i].subtotal_bet = 0;
    this.current_bet = 0;
  }

  clear_pot() {
    for (var i = 0; i < this.players.length; i++)
      this.players[i].total_bet = 0;
  }

  reset_player_statuses(type) {
    for (var i = 0; i < this.players.length; i++) {
      if (type == 0) this.players[i].status = "";
      else if (type == 1 && this.players[i].status != "BUST") this.players[i].status = "";
      else if (type == 2 && this.players[i].status != "FOLD" && this.players[i].status != "BUST") this.players[i].status = "";
    }
  }

  get_num_betting() {
    var n = 0;
    for (var i = 0; i < this.players.length; i++)
      if (this.players[i].status != "FOLD" && this.players[i].status != "BUST" && this.has_money(i)) n++;
    return n;
  }

  change_name() {
    var name = prompt("What is your name?", this.getCookie("playername"));
    //write_ad();
    if (!name) return;
    this.players[0].name = name;
    this.write_player(0, 0, 0, 0);
    this.setCookie("playername", name);
  }

  write_frame(f: any, html: any, n: any): void {

    try {
      //console.log("type of component  " + f);
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

  write_basic_general() {
    this.write_frame("general", "<html><body topmargin=2 bottommargin=0 bgcolor=" + this.BG_COLOR + "><table><tr><td>" + this.get_pot_size_html() + "</td></tr></table></body></html>", "");
  }

  write_settings_frame() {
    var speeds = ['2', '1', '.6', '.3', '0'];
    var speed_select = ['', '', '', '', ''];
    var speed_i: any = this.getCookie("gamespeed");
    if (speed_i == "") speed_i = 1;
    if (speed_i == null || (speed_i != 0 && speed_i != 1 && speed_i != 2 && speed_i != 3 && speed_i != 4)) speed_i = 1;
    speed_select[speed_i] = " selected";
    this.set_speed(speeds[speed_i], speed_i);
    var speed_options = "";
    for (var i = 0; i < speeds.length; i++) speed_options += "<option value='" + speeds[i] + "'" + speed_select[i] + ">" + (i + 1);
    this.write_frame("settings", "<html><body topmargin=7 bottommargin=0 vlink=0000FF bgcolor=" + this.BG_COLOR + "><pre><center><b><font size=+2>Options</font></b>\n\n<a href='javascript:parent.change_name()'>Your name</a>\n\n<form>Speed <select onchange='parent.set_speed(options[selectedIndex].value,selectedIndex);'>" + speed_options + "</select></form><a target=_blank href=http://rawdataserver.com/poker/help.html>Help</a></center></pre></body></html>", "");
  }

  set_deck(v) {
    if (v < 1) this.pix = this.original_pix;
    else this.pix = this.get_base_deck();
    this.preload_pix();
    this.setCookie("deck", v);
    if (this.board)
      for (var i = 0; i < this.board.length; i++)
        if (this.board[i]) this.write_board(i);
  }

  get_base_deck() {
    var n = Math.floor(Math.random() * 4);
    if (n < 1) return ['assets/game-images/d.gif'];
    if (n < 2) return ['assets/game-images/c.gif'];
    if (n < 3) return ['assets/game-images/s.gif'];
    return ['assets/game-images/h.gif'];
  }

  set_speed(s, i) {
    this.speed = s;
    this.setCookie("gamespeed", i);
  }
  //var adt;

  write_ad(n) {
    // if(adt)clearTimeout(adt); //IE only now?
    if (!n) n = 9000;
    n += 1000;
    if (n > 25000) n = 25000;

    // write_frame("ad","<html><head><style>.adHeadline{font:bold 8pt Verdana;}.adText{font:7pt Arial;}</style></head><body topmargin=0 bottommargin=0 leftmargin=0 rightmargin=0 bgcolor=FFFFFF vlink=0000FF><table width=100% cellspacing=0 cellpadding=0><tr><td>...</td></tr></table></body></html>");

    // adt=setTimeout("write_ad("+n+")",n);
  }

 
  original_pix;
  pix = this.get_base_deck();
  pix_index = 0;

  get_next_pic() {
    if (!this.pix) return "#";
    if (++this.pix_index >= this.pix.length)
      this.pix_index = 0;
    return this.pix[this.pix_index];
  }

  init_pix(d) {
    d.sort(this.compRan);
    this.pix = d;
    this.original_pix = d;
    this.preload_pix();
    this.write_settings_frame();
  }


  preload_a = new Image();
  preload_b = new Image();
  preload_c = new Image();
  preload_d = new Image();
  preload_e = new Image();

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
  preload_sd = new Image();
  preload_sh = new Image();
  preload_sc = new Image();
  preload_ss = new Image();
  preload_cb = new Image();

  preload_base_pix() {
    this.preload_sd.src = "assets/game-images/d.gif";
    this.preload_sh.src = "assets/game-images/h.gif";
    this.preload_sc.src = "assets/game-images/c.gif";
    this.preload_ss.src = "assets/game-images/s.gif";
    this.preload_cb.src = "assets/game-images/cardback.gif";
  }

  getCookie(key) {
    var c = document.cookie;
    var a = c.indexOf(key + "="); //buggish
    if (a < 0) return "";
    a += key.length + 1;
    var b = c.indexOf(";", a);
    if (b <= a) return c.substring(a);
    return c.substring(a, b);
  }

  setCookie(key, val) {
    if (this.getCookie(key) == val) return;
    var d: Date = new Date();
    var p = Date.parse(d.toString());
    d.setTime(p + 365 * 24 * 60 * 60 * 1000);
    var u = d.toUTCString();
    document.cookie = key + "=" + val + ";expires=" + u;
  }

  has_money(i) {
    if (this.players[i].bankroll >= .01) return true;
    return false;
  }

  confirm_new() {
    if (confirm("Are you sure that you want to restart the entire game?")) this.new_game();
  }

  confirm_quit() {
    if (confirm("Are you sure that you want to quit?")) parent.location.href = this.BACK_HOME_LINK;
  }

  compRan() {
    return .5 - Math.random();
  }

}
