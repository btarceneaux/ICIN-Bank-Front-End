import { Transaction } from "./transaction";

export class SavingsAccount
{
    public balance:number;
    public confirmed:string = "Pending";
    public id?:number;
    public userId?:number;
    public userName?:string;

    constructor
    (
        inBalance:number,
    )
    {
        this.balance = inBalance;
    }
   
    public set setId(newId:number)
    {
        this.id = newId;
    }

    public set setBalance(newBalance:number)
    {
        this.balance = newBalance;
    }

    public set setUserId(newUserId:number)
    {
        this.userId = newUserId;
    }

    public set setUserName(newUserName:string)
    {
        this.userName = newUserName;
    }

    public set setConfirmation(newConfirmationStatus:string)
    {
        this.confirmed = newConfirmationStatus;
    }
}