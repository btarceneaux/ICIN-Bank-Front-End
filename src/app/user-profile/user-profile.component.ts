import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public router:Router, private service: UserService) { }

  loginId:string = "";
  loggedInUser:User = new User("","","","","");
  checkingAccount:CheckingAccount = new CheckingAccount(0, 0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);

  ngOnInit(): void 
  {
    let obj = sessionStorage.getItem("myUserId");
    if(obj!=null)
    {
      this.loginId = obj;

      console.log("Getting id : " + this.loginId);

      this.service.getFullUserDetails(this.loginId).subscribe(result=>
        {
          this.loggedInUser = result;
        },
        error=>console.log(error),
        ()=>console.log("All details loaded"));
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
}