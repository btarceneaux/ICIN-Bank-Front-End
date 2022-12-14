import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {


  constructor(private router:Router, private service: UserService) { }
  msg:string = "";
  loginId:string = "";
  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);

  ngOnInit(): void 
  {
    let obj = sessionStorage.getItem("myUserId");
    if(obj!=null)
    {
      this.loginId = obj;
    }
    else
    {
      console.log("ID is " + obj);
    }

    this.service.getCheckingAccountInfo(this.loginId).subscribe(result=>
      {
        if(result.id! > 0)
        {
          this.checkingAccount = result;
        }
        else
        {
          console.log("No checking account was returned!");
        }
      },
      error=> console.log(error),
      ()=> 
      {
        this.service.getSavingsAccountInfo(this.loginId).subscribe(result=>
        {
          if(result.id! > 0)
          {
            this.savingsAccount = result;
          }
          else
          {
            console.log("No savings account was returned");
          }
        },
        error=> console.log(error),
        ()=> console.log("Data load finished"))
      });
  }

  transferFunds(data:any) 
  {
    let selectedButton = document.querySelector('input[name = "selection"]:checked');

    if(data.amount == null ||
      selectedButton == null)
      {
        alert("Error! Please choose a valid selection!");
      }
      else
      {
        let amount:number = data.amount;
        let source = data.selection;

        console.log(amount);
        console.log(source);
        console.log(this.loginId);
        console.log(this.checkingAccount);
        console.log(this.savingsAccount);

        if(source == "checkingToSavings")
        {
          if(amount <= 0 || amount > this.checkingAccount.balance)
          {
            alert("Error! The amount you entered must be between $1 and $" + this.checkingAccount.balance);
          }
          else
          {
            this.checkingAccount.balance = amount;
            this.savingsAccount.balance = amount;

            this.service.withdrawFromChecking(this.checkingAccount, this.checkingAccount.id!).subscribe
            (
              result=>
              {
                if(result == "Successful")
                {
                  console.log("Deposit successful!");
                }
                else
                {
                  console.log("Deposit unsuccessful!");
                }
              },
              error=>console.error(),
              ()=> 
              {
                console.log("Withdrawal from Checking Account complete.")

                //Now Deposit into Savings
                this.service.depositIntoSavings(this.savingsAccount, this.savingsAccount.id!).subscribe
                (
                  result=>
                  {
                    if(result == "Successful")
                    {
                      console.log("Deposit successful!");
                    }
                    else
                    {
                      console.log("Deposit unsuccessful!");
                    }
                  },
                  error=>console.error(),
                  ()=> 
                  {
                    console.log("Deposit complete")
                    this.router.navigate(["home"]);
                  }
                )
              }
            )
          }
        }
        else if(source == "savingsToChecking")
        {
          if(amount <= 0 || amount > this.savingsAccount.balance)
          {
            alert("Error! The amount you entered must be between $1 and $" + this.savingsAccount.balance);
          }
          else
          {
            console.log("Before transferring from savings to checking.");
            console.log(this.savingsAccount.balance);
            
            this.checkingAccount.balance = amount;
            this.savingsAccount.balance = amount;

            this.service.withdrawFromSavings(this.savingsAccount, this.savingsAccount.id!).subscribe
            (
              result=>
              {
                if(result == "Successful")
                {
                  console.log("Deposit successful!");
                }
                else
                {
                  console.log("Deposit unsuccessful!");
                }
              },
              error=>console.error(),
              ()=> 
              {
                console.log("Withdrawal From Savings Account Complete.")

                //Now Deposit into Savings
                this.service.depositIntoChecking(this.checkingAccount, this.checkingAccount.id!).subscribe
                (
                  result=>
                  {
                    if(result == "Successful")
                    {
                      console.log("Deposit successful!");
                    }
                    else
                    {
                      console.log("Deposit unsuccessful!");
                    }
                  },
                  error=>console.error(),
                  ()=> 
                  {
                    console.log("Deposit Into Checking Account Complete")
                    this.router.navigate(["home"]);
                  }
                )
              }
            )
          }
        }
        else if(source == "checkingToZelle" )
        {
          var emptyOrFull = document.getElementById("emailOrMobileNumber")
          console.log("Lets see if this is empty or full ")
          console.log(emptyOrFull);

          if(data.emailAddress1 == "" || (amount <= 0 || amount > this.checkingAccount.balance))
          {
            alert("Error! You have entered an invalid value. Please try again!");
          }
          else
          {
            this.checkingAccount.balance = amount;

            this.service.withdrawFromChecking(this.checkingAccount, this.checkingAccount.id!).subscribe
            (
              result=>
              {
                if(result == "Successful")
                {
                  console.log("Withdrawal successful!");
                }
                else
                {
                  console.log("Withdrawal unsuccessful!");
                }
              },
              error=>console.error(),
              ()=> this.router.navigate(["home"])            
            )
          }
        }
        else
        {
          if(data.emailAddress2 == "" || (amount <= 0 || amount > this.savingsAccount.balance))
          {
            alert("Error! You have entered an invalid value. Please try again!");
          }
          else
          {
            this.savingsAccount.balance = amount;

            this.service.withdrawFromSavings(this.savingsAccount, this.savingsAccount.id!).subscribe
            (
              result=>
              {
                if(result == "Successful")
                {
                  console.log("Withdrawal successful!");
                }
                else
                {
                  console.log("Withdrawal unsuccessful!");
                }
              },
              error=>console.error(),
              ()=> this.router.navigate(["home"])            
            )
          }
        }
      }
  }
}