import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  msg :string = "";
  depositRef = new FormGroup({
  name : new FormControl(),
    cardNumber : new FormControl(),
    expirationDate : new FormControl(),
    cvvCode : new FormControl(),
    amount : new FormControl(),
    accountSelect : new FormControl()
  })

    checkingAccount:CheckingAccount = new CheckingAccount(0,0);
    savingsAccount:SavingsAccount = new SavingsAccount(0);
    myBalance:number = 0;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit(): void 
  {
    
  }

  loginId:string = "";
  accountId:number = 0;

  depositFunds()
  {
    let obj = sessionStorage.getItem("myUserId");
    if(obj!=null)
    {
      this.loginId = obj;
      console.log("Account id is " + this.loginId);
    }
    else
    {
      console.log("ID is " + obj);
    }

    let depositInfo = this.depositRef.value;

    if(depositInfo.name != null &&
       depositInfo.cardNumber != null &&
       depositInfo.expirationDate != null &&
       depositInfo.cvvCode != null &&
       depositInfo.amount != null &&
       depositInfo.accountSelect != null)
    {
      if(depositInfo.accountSelect == "checking")
      {
        console.log("Login id is ")
        console.log(this.loginId)
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
            this.checkingAccount.balance = depositInfo.amount!;
            this.accountId = this.checkingAccount.id!;
  
            console.log("AcctId = " + this.accountId);
  
            //If all of the information is complete, store the information in the 
            //database. Need to work on the transaction piece of this now. 
            this.service.depositIntoChecking(this.checkingAccount, this.accountId).subscribe
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
        // Debug here
        console.log("Login id is ")
        console.log(this.loginId)
        //Savings
        this.service.getSavingsAccountInfo(this.loginId).subscribe
        (result=>
          {
            console.log("Result is " + result)
            if(result.id! > 0)
            {
              console.log("ID is fine on checking account")
              this.savingsAccount = result;
            }
            else
            {
              console.log("No savings account was returned!");
            }
          },
          error=>console.log(error),
          ()=> 
          {
            this.savingsAccount.balance = depositInfo.amount!;
            this.accountId = this.savingsAccount.id!;
  
            console.log("AcctId = " + this.accountId);
  
            //If all of the information is complete, store the information in the 
            //database. Need to work on the transaction piece of this now. 
            this.service.depositIntoSavings(this.savingsAccount, this.accountId).subscribe
            (
              result=>
              {
                console.log("These are the parameters being passed in ")
                console.log(this.savingsAccount)
                console.log(this.accountId)

                if(result == "Successful")
                {
                  console.log("Deposit successful!");
                }
                else
                {
                  console.log("Deposit unsuccessful!");
                }
              },
              error=>
              {
                console.log("An error occured")
                console.error()
              },
              ()=> 
              {
                console.log("Deposit complete")
                this.router.navigate(["userHome"]);
              }
            )
          }
        )

      }  
    }
  }
}