import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  msg :string = "";
  withdrawalRef = new FormGroup
  ({
    amount : new FormControl(),
    accountSelect : new FormControl()
  })

  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);
  myBalance:number = 0;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit(): void {
  }

  loginId:string = "";
  accountId:number = 0;

  withdrawFunds()
  {
    let obj = sessionStorage.getItem("myUserId");
    if(obj!=null)
    {
      this.loginId = obj;
      console.log("Account id is " + obj);
    }
    else
    {
      console.log("ID is " + obj);
    }

    let withdrawalInfo = this.withdrawalRef.value;
    if(withdrawalInfo.amount != null &&
      withdrawalInfo.accountSelect != null)
    {
      if(withdrawalInfo.accountSelect == "checking" && 
      withdrawalInfo.amount! > 0 )
      {
        this.service.getCheckingAccountInfo(this.loginId).subscribe
        (result=>
          {
            if(result.id! > 0)
            {
              this.checkingAccount = result;
              console.log("Details before deposit");
              console.log(this.checkingAccount)
            }
            else
            {
              console.log("No checking account was returned!");
            }
          },
          error=>console.log(error),
          ()=> 
          {
            this.checkingAccount.balance = withdrawalInfo.amount!;
            this.accountId = this.checkingAccount.id!;
  
            console.log("AcctId = " + this.accountId);

            //If all of the information is complete, store the information in the 
            //database. Need to work on the transaction piece of this now. 
            this.service.withdrawFromChecking(this.checkingAccount, this.accountId).subscribe
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
                console.log("Withdrawal complete")
                this.router.navigate(["userHome"]);
              }
            )
          }
        )
      }
      else if(withdrawalInfo.accountSelect == "savings" && withdrawalInfo.amount! > 0)
      {
        //Savings
        this.service.getSavingsAccountInfo(this.loginId).subscribe
        (result=>
          {
            if(result.id! > 0)
            {
              this.savingsAccount = result;
              console.log("Details before deposit");
              console.log(this.savingsAccount)
            }
            else
            {
              console.log("No savings account was returned!");
            }
          },
          error=>console.log(error),
          ()=> 
          {
            this.savingsAccount.balance = withdrawalInfo.amount!;
            this.accountId = this.savingsAccount.id!;
  
            console.log("AcctId = " + this.accountId);

            //If all of the information is complete, store the information in the 
            //database. Need to work on the transaction piece of this now. 
            this.service.withdrawFromSavings(this.savingsAccount, this.accountId).subscribe
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
                this.router.navigate(["userHome"]);
              }
            )
          }
        )
      } 
      else
      {
        alert("Please try again! You must have a value greater than zero and you must select the account type!");
      }
    }
  }
}
