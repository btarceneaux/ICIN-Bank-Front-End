import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { CheckingAccount } from './checking-account';
import { SavingsAccount } from './savings-account';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private service: UserService) { }
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
        console.log("Login id is " + this.loginId)
        this.service.getSavingsAccountInfo(this.loginId).subscribe
        (result=>
        {
          this.savingsAccount = result;
        },
        error=> console.log(error),
        ()=> console.log("Data load finished"))
      });
  }
}