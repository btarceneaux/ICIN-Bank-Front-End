import { Component, OnInit } from '@angular/core';
import { CheckingAccount } from '../user-home/checking-account';
import { Transaction } from '../user-home/transaction';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-checking-details',
  templateUrl: './checking-details.component.html',
  styleUrls: ['./checking-details.component.css']
})
export class CheckingDetailsComponent implements OnInit {

  constructor(private service: UserService) { }
  loginId:string = "";
  accountId:string = ""
  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
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

    this.service.getCheckingAccountInfo(this.loginId).subscribe
    (result=>
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
      ()=> //Lastly call the api to get the transaction information 
      {
        this.accountId = this.checkingAccount.id!.toString();

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