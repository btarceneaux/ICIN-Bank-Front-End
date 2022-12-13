import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component
({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private service: UserService) { }
  msg:string = "";
  checkingAccountMessage:any;
  loggedInUser:User = new User("","","","","");
  loggedInCheckingAccount:CheckingAccount = new CheckingAccount(0, 0);
  loggedInSavingsAccount:SavingsAccount = new SavingsAccount(0);
  loginId:string = "";

  ngOnInit(): void 
  {

  }

  loginUser(data:any)
  {
    this.service.loginUser(data.emailAddress, data.password).subscribe(result=>
      {

        if(result > "0" )
        {
          sessionStorage.setItem("myUserId", result);

          this.msg=="Login successful!";
          this.router.navigate(["home"]);
        }
        else
        {
          console.log("Invalid username or password combination. Please try again!")
        }
      },
      error=>console.log(error), 
      ()=> console.log("Finished"));
  }
}