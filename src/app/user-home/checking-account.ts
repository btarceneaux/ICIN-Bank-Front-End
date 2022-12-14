import { Transaction } from "./transaction";

export class CheckingAccount
{
    public balance:number;
    public checkNumber:number;
    public id?:number;

    constructor
    (
        inBalance:number,
        inCheckNumber:number
    )
    {
        this.balance = inBalance;
        this.checkNumber = inCheckNumber;
    }
   
    public set setId(newId:number)
    {
        this.id = newId;
    }

    public set setBalance(newBalance:number)
    {
        this.balance = newBalance;
    }

    public set setCheckNumber(newCheckNumber:number)
    {
        this.checkNumber = newCheckNumber;
    }
}