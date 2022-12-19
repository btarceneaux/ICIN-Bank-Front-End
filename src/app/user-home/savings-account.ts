import { Transaction } from "./transaction";

export class SavingsAccount
{
    public balance:number;
    public confirmed:string;
    public userId:number;
    public userName:string;
    public id?:number;

    constructor
    (
        inBalance:number,
    )
    {
        this.balance = inBalance;
        this.confirmed = "Pending";
        this.userId = 0;
        this.userName = "";
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