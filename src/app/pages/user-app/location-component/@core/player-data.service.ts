export class Player {
    public name: string;
    public bankroll: number;
    public carda: string;
    public cardb: string;
    public status: string;
    public total_bet: number;
    public subtotal_bet: number;

    constructor(name:string, bankroll:number, carda:string, cardb:string, status:string, total_bet:number, subtotal_bet:number) {
        this.name = name;
        this.bankroll = bankroll;
        this.carda = carda;
        this.cardb = cardb;
        this.status = status;
        this.total_bet = total_bet;
        this.subtotal_bet = subtotal_bet;
    }
}

//let ashish =new this.player("Stan Deman", 0, "", "", "", 0, 0);