import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-checkbook-requests',
  templateUrl: './checkbook-requests.component.html',
  styleUrls: ['./checkbook-requests.component.css']
})
export class CheckbookRequestsComponent implements OnInit {

  constructor(private service: UserService, private router:Router) { }

  loginId:number = 0;
  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);
  checkingAccountArray:CheckingAccount[] = [];
  savingsAccountArray:SavingsAccount[] = [];
  userName:string = "";
  

  ngOnInit(): void 
  {
    // First we need to get all users who requested a checkbook
    this.service.getCheckbookRequestsForCheckingAccount().subscribe
    (result =>
      {
        //Check the size first
        if(result.length > 0)
        {
          for(var item of result)
          {
            if(item.checkbookRequested == true && item.checkbookRequestApproved == false)
            {
              this.service.getUserByAccountId(item.id, "checking").subscribe
              (result => 
              {
                console.log("Before assignment to myUser")
                let myUser = result;
                this.loginId = result.userId;
                sessionStorage.setItem("name", result.firstName + " " + result.lastName);
                sessionStorage.setItem("selectedUserId", this.loginId.toString());
              },
              error=>console.log(error),
              ()=> 
              {
                console.log("User information before assignment to account");
                console.log(sessionStorage.getItem("selectedUserId"));

                let myvar:number = parseInt(sessionStorage.getItem("selectedUserId")!);
                this.checkingAccount.userId = myvar;
                this.checkingAccount.userName = sessionStorage.getItem("name")!
                this.checkingAccount.confirmed = "Pending";
                this.checkingAccountArray.push(this.checkingAccount);
              }
              )
              
            }
            else
            {
              this.checkingAccount.confirmed = "Confirmed"; 
            }

            //Get user information from checking account
            
            
            this.checkingAccount = item;
            
          }

          console.log(this.checkingAccountArray);
        }
      },
      error=> console.log(error),
      ()=> //Next get all of the account information
      {
        this.service.getCheckbookRequestsForSavingsAccount().subscribe
        (result =>
          {
            // this.savingsAccountArray = result;
            if(result.length > 0)
            {
              for(var item of result)
              {
                if(item.checkbookRequested == true && item.checkbookRequestApproved == false)
                {
                  let myvar:number = parseInt(sessionStorage.getItem("selectedUserId")!);
                  this.savingsAccount = item;
                  this.savingsAccount.confirmed = "Pending";
                  this.savingsAccount.userId = myvar;
                  this.savingsAccount.userName = sessionStorage.getItem("name")!;
                  this.savingsAccountArray.push(this.savingsAccount);
                } 
                else
                {
                  this.savingsAccount.confirmed = "Confirmed";
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
  {
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
        }
      }

      this.service.confirmCheckingCheckbookStatus(this.checkingAccount).subscribe
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

      this.service.confirmSavingsCheckbookStatus(this.savingsAccount).subscribe
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
    this.router.navigate(["/admin"])
  }
}