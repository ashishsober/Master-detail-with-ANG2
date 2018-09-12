import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HandService } from './hand.service';

@Injectable()
export class BotService { 
    
}
// export class BotService {
//     constructor(private holdemService :HoldemService,
//         private handService:HandService ) { }

//     /*
//     TO DO...
//     if human forces all in & i have lo idconf & a pair then go for it
//     if i'm last to call preflop & it's me & the human & i have somewhat decent cards then call
//     bluff manager, slow play manager, Aces! handler,...?
//     keep track of amount of human bluffing
    
//     pot odds! don't fold at the end if "MAYBE" (& late round & end position)
//     be afraid of lots of overcards & pairs on the board
//     they should try to bet out potential flushes, straights!
//     THEY NEED TO INITIATE BETS BASED ON THE BOARD...even if they have nothing
//     this might depend on position AM_FIRST_TO_BET, LAST_TO_BET (virtual button?)
//     position fundamentals!
//     also: stealing the pot
//     usually, you'd bluff only if no one else was all in...don't bluff if my .subtotal is substantial already
//     MILK IT!...you would go all in but you just bet somewhat cuz u think the other person has shit
    
//     big pot=>big bets
//     if one other current player, bets should make sense as % of that person's stack too
    
//     OTHER FACTORS
//     pair rule...consider all in w/ pair?
//     if pocket pair, tend to go all in more than if equivalent non pair?
//     number of people in hand, in game, & position
//     BETTINGPATTERNS...he keeps winnin'!, big bets
//     adjust confidence based on # people left in hand...bump up a few points if there are 4,3,2 people still left in it
//     exasperated, out of money
//     hang on: no unnecessary risks if only 2 people left in game
//     if everyone's going all in then maybe i shouldn't
//     */

//     P;
//     HCONF
//     ID_CONF
//     CALL_LEVEL;
//     BET_LEVEL;
//     POT_LEVEL;
//     BANKROLL;
//     NUM_IN_HAND = 0;
//     NUM_IN_GAME = 0;
//     RANKA;
//     RANKB;
//     FOLD = 0;
//     CALL;
//     SMALL;
//     MED;
//     BIG;
//     ALLIN;

//     //PREFLOP
//     get_preflop_bet() {
//         this.setup();

//         if (this.holdemService.HUMAN_WINS_AGAIN > 2 && (this.HCONF > 60 || this.RANKA == this.RANKB || this.RANKA > 13 || this.RANKB > 13)) {
//             var other_making_stand = 0;
//             for (var i = 1; i < this.holdemService.players.length; i++) { if (this.holdemService.players[i].bankroll < 1 && this.holdemService.players[i].status != "BUST") other_making_stand = 1; break; }
//             if (other_making_stand < 1) {//should really check to see if bet_level is big and anyone has called...that's taking a stand too...
//                 if (this.BET_LEVEL > 70) return eval(this.whatdo("40:CALL,60:ALLIN",""));
//                 else return eval(this.whatdo("15:MED,40:SMALL,45:CALL", ""));
//             }
//         }

//         if (this.HCONF > 99) {
//             if (this.POT_LEVEL > 75) return eval(this.whatdo("60:ALLIN,10:BIG,20:MED,5:SMALL,5:CALL", ""));
//             if (this.NUM_IN_HAND < 4) return eval(this.whatdo("2:BIG,15:MED,33:SMALL,50:CALL", ""));
//             return eval(this.whatdo("2:ALLIN,8:BIG,40:MED,40:SMALL,10:CALL", ""));
//         }
//         if (this.HCONF > 90) {
//             if (this.POT_LEVEL > 50) return eval(this.whatdo("15:ALLIN,35:BIG,30:MED,15:SMALL,5:CALL",""));
//             if (this.NUM_IN_HAND > 3) return eval(this.whatdo("5:ALLIN,15:BIG,35:MED,35:SMALL,10:CALL",""));
//             return eval(this.whatdo("2:ALLIN,6:BIG,15:MED,55:SMALL,22:CALL",""));
//         }
//         if (this.HCONF > 80) {
//             if (this.POT_LEVEL > 50) {
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("100:ALLIN", ""));
//                 return eval(this.whatdo("100:CALL", ""));
//             }
//             return eval(this.whatdo("5:ALLIN,15:BIG,15:MED,30:SMALL,35:CALL", ""));
//         }

//         if (this.P.subtotal_bet > 0 && this.CALL_LEVEL < 40) { if (this.HCONF > 20 || this.RANKA > 10 || this.RANKB > 10) return eval(this.whatdo("5:SMALL,95:CALL", "")); }

//         if (this.HCONF > 70) {
//             if (this.POT_LEVEL > 75) {
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("100:ALLIN", ""));
//                 return eval(this.whatdo("100:CALL", ""));
//             }
//             if (this.POT_LEVEL > 50) {
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("50:ALLIN,50:BIG", ""));
//                 return eval(this.whatdo("100:CALL", ""));
//             }
//             if (this.NUM_IN_HAND > 3) return eval(this.whatdo("5:ALLIN,15:BIG,30:MED,30:SMALL,20:CALL", ""));
//             return eval(this.whatdo("2:ALLIN,7:BIG,35:MED,36:SMALL,20:CALL", ""));
//         }
//         if (this.HCONF > 60) {
//             if (this.POT_LEVEL > 75) {
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("100:ALLIN", ""));
//                 if (this.CALL_LEVEL < 70) return this.CALL;
//                 if (this.ID_CONF == "HI") return eval(this.whatdo("25:CALL", ""));
//                 return eval(this.whatdo("34:CALL", ""));
//             }
//             if (this.POT_LEVEL > 50) {
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("75:ALLIN,25:BIG", ""));
//                 if (this.CALL_LEVEL < 70) return this.CALL;
//                 return eval(this.whatdo("65:CALL", ""));
//             }
//             if (this.NUM_IN_HAND > 3) return eval(this.whatdo("3:ALLIN,17:BIG,30:MED,30:SMALL,20:CALL", ""));
//             return eval(this.whatdo("1:ALLIN,2:BIG,7:MED,40:SMALL,50:CALL", ""));
//         }
//         if (this.HCONF > 50) {
//             if (this.POT_LEVEL > 75) {
//                 if (this.CALL_LEVEL < 40) return this.CALL;
//                 return this.FOLD;
//             }
//             if (this.POT_LEVEL > 50) {
//                 if (this.CALL_LEVEL < 40) return this.CALL;
//                 return eval(this.whatdo("1:ALLIN,8:CALL", ""));
//             }
//             return eval(this.whatdo("1:ALLIN,1:BIG,5:MED,20:SMALL,73:CALL", ""));
//         }
//         if (this.HCONF > 40) {
//             if (this.BET_LEVEL > 40) {
//                 if (this.CALL_LEVEL < 40) return this.CALL;
//                 return this.FOLD;
//             }
//             if (this.BET_LEVEL > 30) {
//                 if (this.CALL_LEVEL < 30) return this.CALL;
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("24:CALL", ""));
//                 return eval(this.whatdo("37:CALL", ""));
//             }
//             return eval(this.whatdo("1:ALLIN,1:BIG,19:SMALL,79:CALL", ""));
//         }
//         if (this.HCONF > 30) {
//             if (this.BET_LEVEL > 40) {
//                 if (this.CALL_LEVEL < 30) return this.CALL;
//                 return this.FOLD;
//             }
//             if (this.BET_LEVEL > 30) {
//                 if (this.CALL_LEVEL < 30) return eval(this.whatdo("15:SMALL,85:CALL", ""));
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("1:CALL", ""));
//                 return eval(this.whatdo("20:CALL", ""));
//             }
//             return eval(this.whatdo("1:ALLIN,1:BIG,9:SMALL,89:CALL", ""));
//         }
//         if (this.HCONF > 20) {
//             if (this.BET_LEVEL > 30) {
//                 if (this.CALL_LEVEL < 30) return this.CALL;
//                 return this.FOLD;
//             }
//             if (this.BET_LEVEL > 20) {
//                 if (this.CALL_LEVEL < 20) return this.CALL;
//                 if (this.ID_CONF == "LO") return eval(this.whatdo("1:CALL", ""));
//                 return eval(this.whatdo("20:CALL", ""));
//             }
//             return eval(this.whatdo("1:ALLIN,99:CALL", ""));
//         }
//         if (this.CALL_LEVEL > 20) return this.FOLD;
//         if (this.CALL_LEVEL > 10) {
//             if (this.ID_CONF == "LO") return eval(this.whatdo("20:CALL", ""));
//             return eval(this.whatdo("1:MED,40:CALL", ""));
//         }
//         if (this.CALL_LEVEL > 5) {
//             if (this.ID_CONF == "LO") return eval(this.whatdo("1:BIG,15:CALL", ""));
//             return eval(this.whatdo("35:CALL", ""));
//         }
//         if (this.ID_CONF == "LO") return eval(this.whatdo("1:ALLIN,79:CALL", ""));
//         return this.CALL;
//     }
//     hole_rankings =
//         "AA:100,KK:96,QQ:95,JJ:93,AKs:94," +
//         "TT:86,AQs:85,AJs:84,KQs:84,AK:85," +
//         "99:76,JTs:75,QJs:75,KJs:74,ATs:74,AQ:73," +
//         "T9s:66,KQ:66,88:66,QTs:65,98s:64,J9s:65,AJ:65,KTs:65," + //THIS & ABOVE: EARLY POSITION
//         "77:56,87s:55,Q9s:55,T8s:54,KJ:55,QJ:54,JT:54,76s:53,97s:53,Axs:54,65s:53," + //THIS & ABOVE: LATE POSITION
//         "66:46,AT:46,55:45,86s:44,KT:45,QT:44,54s:45,K9s:45,J8s:44,75s:43," +
//         "44:36,J9:35,64s:33,T9:34,53s:33,33:35,98:34,43s:34,22:34,Kxs:34,T7s:33,Q8s:33," + //THIS & ABOVE: BUTTON
//         "87:26,A9:26,Q9:25,76:25,42s:23,32s:23,96s:23,85s:22,J8:22,J7s:22,65:22,54:22,74s:21,K9:22,T8:21,";
//     get_hole_ranking() {
//         var player = this.holdemService.players[this.holdemService.current_bettor_index];
//         var a = player.carda;
//         var b = player.cardb;
//         var n_rank_a = this.handService.get_rank(a);
//         var n_rank_b = this.handService.get_rank(b);
//         if (n_rank_b > n_rank_a) {
//             a = player.cardb;
//             b = player.carda;
//             n_rank_a = this.handService.get_rank(a);
//             n_rank_b = this.handService.get_rank(b);
//         }
//         var r_rank_a = this.my_make_readable_rank(n_rank_a);
//         var r_rank_b = this.my_make_readable_rank(n_rank_b);
//         var suited = "";
//         if (this.handService.get_suit(a) == this.handService.get_suit(b)) suited = "s";
//         var h = "";
//         if (n_rank_a == n_rank_b) h = "" + r_rank_a + "" + r_rank_b;
//         else h = "" + r_rank_a + "" + r_rank_b + suited;
//         var q = this.lookup_hole_ranking(h);
//         if (!q) {
//             h = "" + r_rank_a + "x" + suited;
//             q = this.lookup_hole_ranking(h);
//         }
//         return q;
//     }

//     my_make_readable_rank(r) {
//         var rank = this.holdemService.make_readable_rank(r);
//         if (rank == 10) rank = "T";
//         return rank;
//     }

    
//     lookup_hole_ranking(h) {
//         var i = this.hole_rankings.indexOf(h + ":");
//         if (i < 0) return 0;
//         var j = this.hole_rankings.indexOf(",", i);
//         var r:any = this.hole_rankings.substring(i + h.length + 1, j);
//         return r - 0;
//     }


//     // //POSTFLOP
//     // get_postflop_bet() {
//     //     this.setup();
//     //     var ROUND = 3;
//     //     if (this.holdemService.board[4]) ROUND = 5;
//     //     else if (this.holdemService.board[3]) ROUND = 4;

//     //     if (this.P.subtotal_bet > 0) { //so no check-raising!!!!!!!!
//     //         if (this.HCONF > 20 || this.RANKA > 10 || this.RANKB > 10) {
//     //             if ((this.CALL_LEVEL < 40 && ROUND < 4) || (this.CALL_LEVEL < 30 && ROUND < 5)) return this.CALL;
//     //         }
//     //     }

//     //     var VERDICT = "";
//     //     var STRAIGHT_FLUSH = this.holdemService.test_straight_flush(this.P);
//     //     var FOUR_OF_A_KIND = this.holdemService.test_four_of_a_kind(this.P);
//     //     var FULL_HOUSE = this.holdemService.test_full_house(this.P);
//     //     var FLUSH = this.holdemService.test_flush(this.P);
//     //     var STRAIGHT = this.holdemService.test_straight(this.P);
//     //     var THREE_OF_A_KIND = this.holdemService.test_three_of_a_kind(this.P);
//     //     var TWO_PAIR = this.holdemService.test_two_pair(this.P);
//     //     var ONE_PAIR = this.holdemService.test_one_pair(this.P);
//     //     var HI_CARD = this.holdemService.test_hi_card(this.P);
//     //     let FLUSH_DRAW = 0;
//     //     let STRAIGHT_DRAW = 0;

//     //     if (ROUND < 5) {
//     //         if (this.holdemService.get_xml("num_needed", FLUSH) == 1) {
//     //             var suit = this.holdemService.get_xml("suit", FLUSH);
//     //             if (this.P.carda.substring(0, 1) == suit || this.P.cardb.substring(0, 1) == suit) FLUSH_DRAW = 1;
//     //         }
//     //         if (this.holdemService.get_xml("num_needed", STRAIGHT) == 1) { // of course, it might be on the board...
//     //             STRAIGHT_DRAW = 1; //.....bottom ended & top ended straight draws? 1 point for each?!!....
//     //         }
//     //     }

//     //     if (this.holdemService.get_xml("num_needed", STRAIGHT_FLUSH) < 1) {
//     //         if (this.holdemService.get_xml("num_mine", STRAIGHT_FLUSH) > 0) VERDICT = "GREAT";
//     //         else VERDICT = "PLAY BOARD";
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", FOUR_OF_A_KIND) < 1) {
//     //         if (this.holdemService.get_xml("num_mine", FOUR_OF_A_KIND) > 0) VERDICT = "GREAT";
//     //         else {
//     //             VERDICT = "PLAY BOARD"; //SHOULD CHECK MY KICKER!!!!!!!................
//     //         }
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", FULL_HOUSE) < 1) { //consider 2 or 3 on the board, (higher full house, 4 of a kind)
//     //         if (this.holdemService.get_xml("num_mine", FULL_HOUSE) > 0) VERDICT = "GREAT";
//     //         else VERDICT = "PLAY BOARD";
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", FLUSH) < 1) { //look for full house, etc.
//     //         var num_mine = this.holdemService.get_xml("num_mine", FLUSH);
//     //         if (num_mine > 1) VERDICT = "GREAT";
//     //         else if (num_mine > 0) {
//     //             var rank = 0;
//     //             if (this.P.carda.substring(0, 1) == this.holdemService.get_xml("suit", FLUSH)) rank = this.RANKA;
//     //             else rank = this.RANKB;
//     //             if (rank < 11) VERDICT = "GOOD"; //12???????
//     //             else VERDICT = "GREAT";
//     //         }
//     //         else VERDICT = "MAYBE"; //could look @ board & decide if person was tryin' for flush...FACTOR: ANALYZE BETTING PATTERNS!...
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", STRAIGHT) < 1) { //look for flush, etc.
//     //         if (this.holdemService.get_xml("num_mine", STRAIGHT) > 0) VERDICT = "GREAT";
//     //         else VERDICT = "PLAY BOARD";
//     //         if (this.exists_flush_potential() < 3) VERDICT = "MAYBE"; ////////////POTENTIALLY BAD!!!!!!unless i can get it...!!!!!!!!!!!!!!!!!!
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", THREE_OF_A_KIND) < 1) { //look for straight, etc.
//     //         if (this.holdemService.get_xml("num_mine", THREE_OF_A_KIND) > 0) VERDICT = "GREAT";
//     //         else {
//     //             var k1 = this.holdemService.get_xml("kicker_1", THREE_OF_A_KIND);
//     //             var k2 = this.holdemService.get_xml("kicker_2", THREE_OF_A_KIND);
//     //             if ((k1 == this.RANKA && k2 == this.RANKB) || (k1 == this.RANKB && k2 == this.RANKA)) VERDICT = "GREAT";
//     //             else if (k1 == this.RANKA || k1 == this.RANKB) VERDICT = "GOOD";
//     //             else if (k1 > 11 && k2 > 9) VERDICT = "GOOD";
//     //             else VERDICT = "MAYBE"; //should really bet "POTENTIALLY BAD".............but can i get it?...............!!!!!!!!!!!!!
//     //         }
//     //         if (this.exists_flush_potential() < 3) VERDICT = "MAYBE"; ////////////POTENTIALLY BAD!!!!!!!!!unless i can get it...!!!!!!!!!!
//     //         if (this.exists_straight_potential() < 2) VERDICT = "MAYBE"; ////////////"POTENTIALLY BAD!!!!!!!unless i can get it...!!!!!!!!!!!!
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", TWO_PAIR) < 1) {
//     //         var num_mine = this.holdemService.get_xml("num_mine", TWO_PAIR);
//     //         if (num_mine > 1) {
//     //             if (this.RANKA == this.RANKB) VERDICT = "GOOD";
//     //             else VERDICT = "GREAT";
//     //         } else if (num_mine > 0) {
//     //             if (ROUND < 4) VERDICT = "GREAT"; //hmmmmmmmm........
//     //             else {

//     //                 //little change in the code in if block by ashish
//     //                 let rank: any = this.holdemService.get_xml("rank_1", TWO_PAIR);
//     //                 if (rank != this.RANKA && rank != this.RANKB) { let rank: any = this.holdemService.get_xml("rank_2", TWO_PAIR); }
//     //                 if (rank < 10) VERDICT = "MAYBE"; //11??????
//     //                 else VERDICT = "GOOD";
//     //             }
//     //         } else {
//     //             var kick = this.holdemService.get_xml("kicker", TWO_PAIR);
//     //             if (kick == this.RANKA || kick == this.RANKB || kick > 10) VERDICT = "PLAY BOARD";
//     //             else VERDICT = "MAYBE"; //"POTENTIALLY BAD"????????................................!!!!unless i can get it...!!!!
//     //         }
//     //         if (this.exists_flush_potential() < 3) VERDICT = "MAYBE"; /////////////"POTENTIALLY BAD!!!!!!!!unless i can get it...!!!!!!!!!!!!!!!!
//     //         if (this.exists_straight_potential() < 2) VERDICT = "MAYBE"; ////////////"POTENTIALLY BAD!!!!!!unless i can get it...!!!!!!!!!!!!!
//     //     }
//     //     if (VERDICT == "" && this.holdemService.get_xml("num_needed", ONE_PAIR) < 1) {
//     //         if (this.holdemService.get_xml("num_mine", ONE_PAIR) > 0) {
//     //             var my_rank = this.holdemService.get_xml("rank", ONE_PAIR);
//     //             var num_overcards = 0;
//     //             for (var i = 0; i < this.holdemService.board.length; i++) {
//     //                 if (this.holdemService.board[i] && this.holdemService.get_rank(this.holdemService.board[i]) > my_rank) num_overcards++;
//     //             }
//     //             if (num_overcards < 1) {
//     //                 if (my_rank > 11) VERDICT = "GREAT";
//     //                 VERDICT = "GOOD";
//     //             } else if (num_overcards < 2) {
//     //                 if (my_rank > 7) VERDICT = "GOOD";
//     //                 VERDICT = "MAYBE";
//     //             }
//     //             else VERDICT = "MAYBE";
//     //             if (this.exists_flush_potential() < 3) VERDICT = "MAYBE"; /////////////"POTENTIALLY BAD!!!!!!!!!unless i can get it...!!!!!!!!!!!!!!!
//     //             if (this.exists_straight_potential() < 2) VERDICT = "MAYBE"; ////////////"POTENTIALLY BAD!!!!!!!unless i can get it...!!!!!!!!!!!!
//     //         }

//     //         //add verdict "POTENTIALLY BAD" here, for example, for when the board looks dangerous?
//     //         //but what if i can get it!?!?!!!!!!!!!!!!!!!!!!!!!!!!!

//     //     }

//     //     //special case if verdict is MAYBE AND i have a draw...tend not to fold
//     //     //special case where verdict is good & i have a draw...tend not to fold

//     //     if (this.holdemService.HUMAN_WINS_AGAIN > 2 && (VERDICT == "GREAT" || VERDICT == "GOOD" || VERDICT == "MAYBE" || this.RANKA == this.RANKB)) {
//     //         var other_making_stand = 0;
//     //         for (var i = 1; i < this.holdemService.players.length; i++) { if (this.holdemService.players[i].bankroll < 1 && this.holdemService.players[i].status != "BUST") other_making_stand = 1; break; }
//     //         if (other_making_stand < 1) {//should really check to see if bet_level is big and anyone has called...that's taking a stand too...
//     //             if (this.BET_LEVEL > 70) return eval(this.whatdo("40:CALL,60:ALLIN", ""));
//     //             else return eval(this.whatdo("10:MED,40:SMALL,50:CALL", ""));
//     //         }
//     //     }

//     //     if (VERDICT == "GREAT") {
//     //         if (ROUND < 5) return eval(this.whatdo("5:ALLIN,5:BIG,25:MED,45:SMALL,20:CALL", ""));
//     //         return eval(this.whatdo("30:ALLIN,40:BIG,30:MED", ""));
//     //     }
//     //     if (VERDICT == "GOOD") {
//     //         if (ROUND < 4) {
//     //             if (this.BET_LEVEL > 79) {
//     //                 if (this.CALL_LEVEL < 70 || FLUSH_DRAW) return this.CALL;
//     //                 return eval(this.whatdo("59:CALL", ""));
//     //             }
//     //             if (this.P.subtotal_bet > 0) return eval(this.whatdo("1:ALLIN,2:BIG,5:MED,20:SMALL,72:CALL", ""));
//     //             return eval(this.whatdo("3:ALLIN,40:BIG,42:MED,10:SMALL,5:CALL", ""));
//     //         }
//     //         if (this.BET_LEVEL < 50) {
//     //             if (this.P.subtotal_bet > 0) return eval(this.whatdo("1:BIG,3:MED,21:SMALL,75:CALL", ""));
//     //             return eval(this.whatdo("10:BIG,20:MED,50:SMALL,20:CALL", ""));
//     //         }
//     //         if (this.BET_LEVEL < 80) {
//     //             if (this.CALL_LEVEL < 50) return this.CALL;
//     //             return eval(this.whatdo("65:CALL", "")); //SOME THINGS DEPEND ON THE BOARD,POT ODDS,CONFIDENCE!!!!!!!!!!!!!!!!!!!!!!!!
//     //         }
//     //         if (this.CALL_LEVEL < 70) return this.CALL;
//     //         if (ROUND < 5) return eval(this.whatdo("35:CALL", ""));
//     //         return eval(this.whatdo("25:CALL", ""));
//     //     }
//     //     if (VERDICT == "MAYBE") {
//     //         if (this.BET_LEVEL < 50) {
//     //             if (this.CALL > 0) return eval(this.whatdo("5:MED,15:SMALL,80:CALL", ""));
//     //             return eval(this.whatdo("5:BIG,20:MED,50:SMALL,25:CALL", ""));
//     //         }
//     //         if (this.BET_LEVEL < 70) {
//     //             if (ROUND < 4 && FLUSH_DRAW) return this.CALL;
//     //             if (this.CALL_LEVEL < 40) return this.CALL;
//     //             if (this.ID_CONF == "LO") {
//     //                 if (ROUND < 4) return eval(this.whatdo("35:CALL", ""));
//     //                 if (ROUND < 5) return eval(this.whatdo("65:CALL", ""));
//     //                 return eval(this.whatdo("89:CALL", ""));
//     //             }
//     //             if (ROUND < 4) return eval(this.whatdo("61:CALL", ""));
//     //             if (ROUND < 5) return eval(this.whatdo("31:CALL", ""));
//     //             return eval(this.whatdo("19:CALL", ""));
//     //         }
//     //         if (this.CALL_LEVEL < 40) return this.CALL;
//     //         if (ROUND < 4) {
//     //             if (this.CALL_LEVEL < 50) return this.CALL;
//     //             return eval(this.whatdo("50:CALL", ""));
//     //         }
//     //         return eval(this.whatdo("11:CALL", ""));
//     //     }
//     //     if (FLUSH_DRAW) {
//     //         if (ROUND < 4) return eval(this.whatdo("20:MED,40:SMALL,40:CALL", ""));
//     //         if (ROUND < 5) {
//     //             if (this.CALL < 1) return eval(this.whatdo("10:MED,90:SMALL", ""));
//     //             if (this.CALL_LEVEL < 40) return this.CALL;
//     //             return eval(this.whatdo("33:CALL", "")); //depends on how good my cards are!!!!!
//     //         } else if (STRAIGHT_DRAW) {
//     //             if (this.BET_LEVEL < 50) {
//     //                 if (ROUND < 4) return eval(this.whatdo("20:MED,40:SMALL,40:CALL", ""));
//     //                 if (ROUND < 5) return eval(this.whatdo("5:MED,40:SMALL,55:CALL", ""));
//     //             } else {
//     //                 if (this.CALL_LEVEL < 40) return this.CALL;
//     //                 if (ROUND < 4) return eval(this.whatdo("29:CALL", "")); //depends on how good my cards are!!!!!!!!!
//     //                 if (ROUND < 5) return eval(this.whatdo("9:CALL", ""));
//     //             }
//     //         }
//     //         //otherwise, cleanup process handles it
//     //     }
//     //     if (VERDICT == "PLAY BOARD") return this.CALL;


//     //     //perhaps use the ranking to come up w/ a preliminary strategy & then modify that strategy:
//     //     //bluff
//     //     //slow play
//     //     //take a stand...human wins 4 in a row & human still playing & num players is 2 & i have good/maybe cards then call!
//     //     //play straight


//     //     var hi_rank = this.RANKA;
//     //     let lo_rank = this.RANKB;
//     //     if (this.RANKA < this.RANKB) { hi_rank = this.RANKB; lo_rank = this.RANKA; }
//     //     if (this.HCONF > 80) {
//     //         if (this.CALL < 1) {
//     //             if (ROUND < 5) return eval(this.whatdo("10:MED,80:SMALL,10:CALL", ""));
//     //             return eval(this.whatdo("20:MED,70:SMALL,10:CALL", ""));
//     //         }
//     //         if (this.CALL_LEVEL < 50) return this.CALL;
//     //         if (this.CALL_LEVEL < 70 && ROUND < 5) return this.CALL;
//     //         if (this.CALL_LEVEL < 80 && ROUND < 4) return this.CALL;
//     //         return this.FOLD;
//     //     }
//     //     if (this.HCONF > 70) {
//     //         if (this.CALL < 1) {
//     //             if (ROUND < 5) return eval(this.whatdo("10:MED,75:SMALL,15:CALL", ""));
//     //             return eval(this.whatdo("10:MED,80:SMALL,10:CALL", ""));
//     //         }
//     //         if (this.CALL_LEVEL < 40) return this.CALL;
//     //         if (this.CALL_LEVEL < 50) return eval(this.whatdo("50:CALL", ""));
//     //         return this.FOLD;
//     //     }
//     //     if (hi_rank > 13 || this.HCONF > 50) {
//     //         if (this.CALL < 1) {
//     //             if (ROUND < 5) return eval(this.whatdo("5:MED,75:SMALL,20:CALL", ""));
//     //             return eval(this.whatdo("5:MED,75:SMALL,20:CALL", ""));
//     //         }
//     //         if (this.CALL_LEVEL < 30) return this.CALL;
//     //         if (this.CALL_LEVEL < 40 && ROUND < 4) return this.CALL;
//     //         return this.FOLD;
//     //     }
//     //     if (this.CALL < 1) {
//     //         if (ROUND < 5) return eval(this.whatdo("20:SMALL,80:CALL", ""));
//     //         return eval(this.whatdo("5:MED,70:SMALL,25:CALL", ""));
//     //     }
//     //     if (this.CALL_LEVEL < 20) return this.CALL;
//     //     if (this.CALL_LEVEL < 30) return eval(this.whatdo("10:SMALL,20:CALL", ""));
//     //     return this.FOLD;
//     // }

//     // exists_flush_potential() { return this.holdemService.get_xml("num_needed", this.holdemService.test_flush(this.holdemService.player)); }
//     // exists_straight_potential() { return this.holdemService.get_xml("num_needed", this.holdemService.test_straight(this.holdemService.player)); } //BUT inside draws!!!!!!!!!!!!!!!!!!!

//     //ETC.
//     setup() {
//         this.P = this.holdemService.players[this.holdemService.current_bettor_index];
//         this.CALL = this.holdemService.current_bet - this.P.subtotal_bet;
//         this.RANKA = this.handService.get_rank(this.P.carda);
//         this.RANKB = this.handService.get_rank(this.P.cardb);
//         this.HCONF = this.get_hole_ranking();
//         this.CALL_LEVEL = this.get_bet_level(this.CALL);
//         this.BET_LEVEL = this.get_bet_level(this.holdemService.current_bet); //feed      data we calc here so we don't gotta doubl do it!..
//         this.POT_LEVEL = this.get_pot_level();
//         this.BANKROLL = this.P.bankroll;
//         var total_bankrolls = this.holdemService.get_pot_size();
//         for (var i = 0; i < this.holdemService.players.length; i++) {
//             total_bankrolls += this.holdemService.players[i].bankroll;
//             if (this.holdemService.players[i].status != "BUST") {
//                 this.NUM_IN_GAME++;
//                 if (this.holdemService.players[i].status != "FOLD") this.NUM_IN_HAND++;
//             }
//         }
//         this.ID_CONF = "MID";
//         var avg_bankroll = total_bankrolls / this.NUM_IN_GAME;
//         if (this.BANKROLL < avg_bankroll / 2) this.ID_CONF = "LO";
//         if (this.BANKROLL > avg_bankroll * 1.5) this.ID_CONF = "HI";
//         this.SMALL = this.CALL + this.holdemService.BIG_BLIND * 2; //consider MINIMUM RAISE here & below!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         if (this.POT_LEVEL > 40) this.SMALL += 5;
//         if (this.NUM_IN_GAME > 3) {
//             this.MED = this.CALL + this.holdemService.BIG_BLIND * 4;
//             this.BIG = this.CALL + this.holdemService.BIG_BLIND * 10;
//         } else {
//             this.SMALL += 5;
//             this.MED = this.round5(this.CALL + .1 * this.BANKROLL); //consider minimum raise!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//             this.BIG = this.round5(this.CALL + .2 * this.BANKROLL); //consider minimum raise!
//         }
//         this.ALLIN = this.BANKROLL;
//     }
//     whatdo(q, r) {
//         q += ",";
//         if (!r) r = Math.random();
//         var p = 0;
//         while (1) {
//             var a = q.indexOf(":");
//             var b = q.indexOf(",", a);
//             if (a < 0 || b < 0) return "FOLD";
//             var probability = (q.substring(0, a) - 0) / 100;
//             var action = q.substring(a + 1, b);
//             q = q.substring(b + 1);
//             p += probability;
//             if (r <= p) return action;
//         }
//         return "FOLD";
//     }
//     round5(n) {
//         if (n < 5) return 5;
//         var s:any = "" + n;
//         var i = s.indexOf(".");
//         if (i > 0) s = s.substring(0, i);
//         n = s - 0;
//         while (n % 5 != 0) n++;
//         return n;
//     }
    
//     get_bet_level(b) {
//         var size = b / this.P.bankroll;
//         if (size <= .015 || b <= 5) return 5;
//         if (size <= .02 || b <= 10) return 10;
//         if (size <= .03 || b <= 15) return 20;
//         if (size <= .06 || b <= 30) return 30;
//         if (size <= .12 || b <= 60) return 40;
//         if (size <= .21 || b <= 100) return 50;
//         if (size <= .35 || b <= 150) return 70;
//         if (size <= .41 || b <= 200) return 80;
//         return 100;
//     }

//     get_pot_level() {
//         var p = this.holdemService.get_pot_size();
//         var b = this.holdemService.players[this.holdemService.current_bettor_index].bankroll;
//         if (p > .5 * b) return 100;
//         else if (p > .25 * b) return 51;
//         else return 1;
//     }


// }