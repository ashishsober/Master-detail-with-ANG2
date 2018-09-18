import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';

@Injectable()
export class PlayerDataService {

    subject = new Rx.BehaviorSubject(Math.random());

    deal_and_write_a(button_index, players, deck_index, cards, speed) {
        var pause_time = 0;
        for (var i = 0; i < players.length; i++) {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            if (players[j].carda) break;
            players[j].carda = cards[deck_index++];

            /*
            players[0].carda="d6";
            players[1].carda="h7";
            players[2].carda="s14";
            players[3].carda="d7";
            players[4].carda="h9";
            //*/

            //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
            pause_time += 550;
        }
        setTimeout(() => this.deal_and_write_b(button_index, players, deck_index, cards, speed), pause_time * speed);
    }



    deal_and_write_b(button_index, players, deck_index, cards, speed) {
        var pause_time = 0;
        for (var i = 0; i < players.length; i++) {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            if (players[j].cardb) break;
            players[j].cardb = cards[deck_index++];

            /*
            players[0].cardb="h11";
            players[1].cardb="c2";
            players[2].cardb="c14";
            players[3].cardb="d12";
            players[4].cardb="s11";
            //*/

            //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
            pause_time += 550;
        }
        //setTimeout(() => this.main(), pause_time * speed);
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

}







export class Player {
    public name: string;
    public bankroll: number;
    public carda: string;
    public cardb: string;
    public status: string;
    public total_bet: number;
    public subtotal_bet: number;

    constructor(name: string, bankroll: number, carda: string, cardb: string, status: string, total_bet: number, subtotal_bet: number) {
        this.name = name;
        this.bankroll = bankroll;
        this.carda = carda;
        this.cardb = cardb;
        this.status = status;
        this.total_bet = total_bet;
        this.subtotal_bet = subtotal_bet;
    }
}

