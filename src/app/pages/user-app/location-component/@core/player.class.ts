export class Player {
    public name: string;
    public bankroll: number;
    public carda: string;
    public cardb: string;
    public status: string;
    public total_bet: number;
    public subtotal_bet: number;
    public background : { };

    constructor(name: string, bankroll: number, carda: string, cardb: string, status: string, total_bet: number, subtotal_bet: number,background:object) {
        this.name = name;
        this.bankroll = bankroll;
        this.carda = carda;
        this.cardb = cardb;
        this.status = status;
        this.total_bet = total_bet;
        this.subtotal_bet = subtotal_bet;
        this.background = background;
    }
}