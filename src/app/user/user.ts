export class User
{
    constructor
    (
        public firstName:string,
        public lastName:string,
        public phoneNumber:string,
        public emailAddress:string,
        public password:string,
        public id?:number            //This needs to be optional and set after login
    )
    {
        
    }

    public set setId(newId:number)
    {
        this.id = newId;
    }

    public set setFirstName(newFirstName:string)
    {
        this.firstName = newFirstName;
        console.log("First name being set to : " + this.firstName);
    }

    public set setLastName(newLastName:string)
    {
        this.lastName = newLastName;
    }

    public set setPhoneNumber(newPhoneNumber:string)
    {
        this.phoneNumber = newPhoneNumber;
    }

    public set setEmailAddress(newEmailAddress:string)
    {
        this.emailAddress = newEmailAddress;
        console.log("Email address being set to : " + this.emailAddress);
    }

    public set setPassword(newPassword:string)
    {
        this.password = newPassword;
    }
}
//Not sure if we need to put fields in here or not.....
// export class UserCheckingAccount
// {
//     constructor(public user:User, public checkingAccount:CheckingAccount)
//     {

//     }
// }

// export class UserSavingsAccount
// {
//     constructor(public user:User, public savingsAccount:SavingsAccount)
//     {
        
//     }
// }

// export class CheckingAccount
// {
//     public balance:number = 0;
//     public checkNumber:number = 0;
// }

// export class SavingsAccount
// {
//     public balance:number = 0;
// }