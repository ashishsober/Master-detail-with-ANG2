import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';

@Injectable()
export class PlayerDataService {

    deal_and_write_a(button_index, players, deck_index, cards, speed) {
        var pause_time = 0;
        for (var i = 0; i < players.length; i++) {
            this.doSetTimeoutForDeal_A(i, button_index, players, deck_index++, cards);
        }
        //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
        setTimeout(() => this.deal_and_write_b(button_index, players, deck_index, cards, speed),25000);
    }

    doSetTimeoutForDeal_A(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            console.log("player position--->" ,i * 5000);
            players[j].carda = cards[deck_index];
        },i * 5000);
    }

    deal_and_write_b(button_index, players, deck_index, cards, speed) {
        for (var i = 0; i < players.length; i++) {
            this.doSetTimeoutForDeal_B(i, button_index, players, deck_index++, cards);
            //setTimeout(() => this.write_player(j, 0, 0, 1), pause_time * this.speed);
        }
        //setTimeout(() => this.main(), pause_time * speed);
    }

    doSetTimeoutForDeal_B(i, button_index, players, deck_index, cards) {
        setTimeout(() => {
            var j = this.get_next_player_position(button_index, 1 + i, players);
            players[j].cardb = cards[deck_index];
        },i * 5000);
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

