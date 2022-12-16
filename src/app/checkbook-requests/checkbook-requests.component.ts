import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-checkbook-requests',
  templateUrl: './checkbook-requests.component.html',
  styleUrls: ['./checkbook-requests.component.css']
})
export class CheckbookRequestsComponent implements OnInit {

  constructor(private service: UserService, private router:Router) { }

  loginId:string = "";
  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);
  checkingAccountArray:CheckingAccount[] = [];
  savingsAccountArray:SavingsAccount[] = [];

  ngOnInit(): void 
  {
    // First we need to get all users who requested a checkbook
    this.service.getCheckbookRequestsForCheckingAccount().subscribe
    (result =>
      {
        this.checkingAccountArray = result;

        if(this.checkingAccountArray.length > 0)
        {
          console.log("The checking array has " + this.checkingAccountArray.length + " checking accounts in it.");
          
          //We need to loop through this and put a user account name in the account.
          for(var item of this.checkingAccountArray)
          {
            if(item.confirmed == "")
            {
              item.setConfirmation = "Pending";
            }
              
            console.log("Item details after set")
            console.log(item.confirmed)
          }

        }
      },
      error=> console.log(error),
      ()=> //Next get all of the account information
      {
        this.service.getCheckbookRequestsForSavingsAccount().subscribe
        (result =>
          {
            this.savingsAccountArray = result;

            if(this.savingsAccountArray.length > 0)
            {
              console.log("The savings array has " + this.savingsAccountArray.length + " checking accounts in it.");
            
              //We need to loop through this and put a user account name in the account.
              for(let i=0; i<this.savingsAccountArray.length; i++)
              {
                if(this.savingsAccountArray[i].confirmed == "")
                {
                  this.savingsAccountArray[i].setConfirmation = "Pending";
                }
              }
            }
          },
          error=> console.log(error),
          ()=> console.log("Account information complete.")
        )
      }
    ) 
  }

  confirmRequest(accountId:number, accountType:string)
  {//BEGIN
    //Get account number
    alert(accountId);
    alert("Length of list is " + this.checkingAccountArray.length);
    if(accountType == "checking")
    {
      //Get the account in the array
      for(let i = 0; i<this.checkingAccountArray.length; i++)
      {
        if(this.checkingAccountArray[i].id == accountId)
        {
          this.checkingAccount = this.checkingAccountArray[i];
          console.log("The checking id from the list is");
          console.log(this.checkingAccount.id?.toString());
          this.checkingAccount.setConfirmation = "Confirmed";
          alert(this.checkingAccount.confirmed);
        }
      }

      this.service.requestCheckingAccountCheckbook(this.checkingAccount).subscribe
      (result =>
        {
          if(result == "Successful")
          {
            
            alert("The confirmation status is " + this.checkingAccount.confirmed);
          }
          else
          {
            console.log("Data has not been fetched.");
          }
        },
        error => console.log(error),
        ()=> console.log("Request complete")
      )

      
    }
    else
    {
      this.service.getSavingsAccountInfo(accountId.toString()).subscribe
      (result =>
        {
          if(result.id == accountId)
          {
            this.savingsAccount = result;
          }
        },
        error => console.log(error),
        () => console.log("The account details have been found")
      )

      this.service.requestSavingsaccountCheckbook(this.savingsAccount).subscribe
      (result =>
        {
          if(result == "Successful")
          {
            this.savingsAccount.confirmed = "Confirmed";
            console.log("Data has been fetched.");
          }
          else
          {
            console.log("Data has not been fetched.");
          }
        },
        error => console.log(error),
        ()=>console.log("Request complete")
      )


    }
  }
}