export class Transaction
{
    public amount:number;
    public transactionNumber?:number;
    public transactionDate?:Date;
    public description?:string;
    public accountId?:number;
    public transactionType?:string;

    constructor
    (
        inAmount:number
    )
    {
        this.amount = inAmount;
    }

    public set setAmount(newAmount:number)
    {
        this.amount = newAmount;
    }

    public set setTransactionNumber(newTransactionNumber:number)
    {
        this.transactionNumber = newTransactionNumber;
    }

    public set setTransactionDate(newTransactionDate:Date)
    {
        this.transactionDate = newTransactionDate;
    }

    public set setDescription(newDescription:string)
    {
        this.description = newDescription;
    }

    public set setAccountId(newAccountId:number)
    {
        this.accountId = newAccountId;
    }

    public set setTransactionType(newTransactionType:string)
    {
        this.transactionType = newTransactionType;
    }
}