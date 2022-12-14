import { Component, OnInit } from '@angular/core';
import { SavingsAccount } from '../user-home/savings-account';
import { Transaction } from '../user-home/transaction';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-savings-details',
  templateUrl: './savings-details.component.html',
  styleUrls: ['./savings-details.component.css']
})
export class SavingsDetailsComponent implements OnInit {

  constructor(private service: UserService) { }
  loginId:string = "";
  accountId:string = ""
  savingsAccount:SavingsAccount = new SavingsAccount(0);
  transactions: Transaction[] = []

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

    this.service.getSavingsAccountInfo(this.loginId).subscribe
    (result=>
      {
        if(result.id! > 0)
        {
          this.savingsAccount = result;
        }
        else
        {
          console.log("No checking account was returned!");
        }
      },
      error=> console.log(error),
      ()=> //Lastly call the api to get the transaction information 
      {
        this.accountId = this.savingsAccount.id!.toString();

        this.service.getTransactionByAccountId(this.accountId).subscribe
        (result =>
          {
            if(result.length > 0)
            {
              this.transactions = result;
            }
            else
            {
              console.log("No transactions have been made.");
            }
          },
          error=> console.log(error),
          ()=> console.log("Transactions have been loaded.")
        )
      }
    )
  }

}
