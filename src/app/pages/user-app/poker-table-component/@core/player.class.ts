export interface Deserializable {
    deserialize(input: any): this;
}

export class Player implements Deserializable{
    public name: string;
    public bankroll: number;
    public carda: string;
    public cardb: string;
    public status: string;
    public total_bet: number;
    public subtotal_bet: number;
    public background: Background;

    // constructor(data:Player) {
    //     this.name = data.name;
    //     this.bankroll = data.bankroll;
    //     this.carda = data.carda;
    //     this.cardb = data.cardb;
    //     this.status = data.status;
    //     this.total_bet = data.total_bet;
    //     this.subtotal_bet = data.subtotal_bet;
    //     this.background = Object.assign({},data.background);
    // }

    deserialize(input: Player):this {
        Object.assign(this, input);
        this.background = new Background().deserialize(input.background);
        return this;
    }
}

export class Background implements Deserializable {
    base_background:string;
    background_color_a:string;
    background_a: string;
    background_color_b:string;
    background_b:string;
    timer:number

    deserialize(input:any):this {
        Object.assign(this,input);
        return this;
    }
}