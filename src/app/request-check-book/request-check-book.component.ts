import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-request-check-book',
  templateUrl: './request-check-book.component.html',
  styleUrls: ['./request-check-book.component.css']
})
export class RequestCheckBookComponent implements OnInit {

  constructor(private router:Router, private service:UserService) { }

  accountType:string = ""
  msg:string = "";
  checkingMessage:string = "Requesting check book for the primary account";
  savingsMessage:string = "Requesting check book for the savings account";
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
          console.log("Checking account returned is ")
          console.log(this.checkingAccount);
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

  selectEvent(event:any)
  {
    let message = "";
    message = event.target.value;
    let button = <HTMLInputElement> document.getElementById('btn');

    if(message == "checking" || message == "savings")
    {
      this.accountType = message;
      this.msg = this.checkingMessage;
      button.disabled = false;
    }
      
    else
    {
      button.disabled = true;
      this.msg = "";
    }
  
  }

  navigateHome()
  {
    // alert("The request for a new checkbook has been sent.");
    
    if(this.accountType == "checking")
    {
      this.service.requestCheckingAccountCheckbook(this.checkingAccount).subscribe
      (result =>
      {
        console.log("We'll see if this returned the proper results");
        console.log(result)
      },
      error => console.log(error),
      ()=> console.log("Finished requesting checking account checkbook"));
    }
    else
    {
      this.service.requestSavingsaccountCheckbook(this.savingsAccount).subscribe
      (result =>
        {
          console.log(result);
        },
        error=> console.log(error),
        ()=>console.log("Finished requesting savings account checkbook")
      )
    }
    
    

    this.router.navigate(["home"]);
  }
  
}
