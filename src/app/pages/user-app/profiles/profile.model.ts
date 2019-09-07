export interface Deserializable {
    deserialize(input: any): this;
}


export class User implements Deserializable{
    _id:string;
    gender:string;
    pan_no:string;
    mobile:number;
    email:string;
    last_name:string;
    first_name:string;

    deserialize(input:any):this{
        Object.assign(this,input);
        return this;
    }
}