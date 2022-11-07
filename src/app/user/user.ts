export class User
{
    constructor
    (
        public firstName:string,
        public lastName:string,
        public phoneNumber:string,
        public emailAddress:string,
        public password:string
    )
    {

    }
}
//Not sure if we need to put fields in here or not.....
export class UserCheckingAccount
{
    constructor(public user:User, public checkingAccount:CheckingAccount)
    {

    }
}

export class UserSavingsAccount
{
    constructor(public user:User, public savingsAccount:SavingsAccount)
    {
        
    }
}

export class CheckingAccount
{
    
}

export class SavingsAccount
{

}