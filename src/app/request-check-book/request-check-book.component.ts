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
    alert("The request for a new checkbook has been sent.");
    this.router.navigate(["home"]);
  }
  
}
