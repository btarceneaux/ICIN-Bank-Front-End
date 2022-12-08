export class SavingsAccount
{
    public balance:number;
    public id?:number;
    public transactions?: any[] = [];
    

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
}