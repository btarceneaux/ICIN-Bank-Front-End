export class CheckingAccount
{
    public balance:number;
    public checkNumber:number;    //This is not needed
    public confirmed:string = "";
    public id?:number;
    public userId?:number;
    public userName?:string;

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