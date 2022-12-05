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

  constructor(public router:Router, private service: UserService) { }
  msg:string = "";
  checkingAccountMessage:any;
  loggedInUser:User = new User("","","","","");
  loggedInCheckingAccount:CheckingAccount = new CheckingAccount(0, 0);
  loggedInSavingsAccount:SavingsAccount = new SavingsAccount(0, 0);

  ngOnInit(): void {
  }

  loginUser(data:any)
  {
    console.log(data.emailAddress);
    console.log(data.password);

    this.service.loginUser(data.emailAddress, data.password).subscribe(result=>
      {

        if(result > "0" )
        {
          console.log(result);
          this.loggedInUser.setEmailAddress = data.emailAddress;
          this.loggedInUser.setPassword = data.password;
          //Store the id of the user in the object
          this.loggedInUser.setId = parseInt(result); 

          this.msg=="Login successful!";
          console.log("Login successful! The id of the user is " + this.loggedInUser.id);
          this.router.navigate(["home"]);
        }
        else
        {
          console.log("Invalid username or password combination. Please try again!")
        }
      },
      error=>console.log(error), 
      ()=> 
      {
        //console.log(this.msg);

        this.service.getCheckingAccountInfo(this.loggedInUser)
        .subscribe(result =>
          {
            //Assign the data to the logged in checking account
            this.loggedInCheckingAccount = result;

            this.service.setCheckingAccount(this.loggedInCheckingAccount);
          },
          error=> console.log(error),
          ()=>
          {
            this.service.getSavingsAccountInfo(this.loggedInUser)
            .subscribe(result =>
              {
                this.loggedInSavingsAccount = result;

                this.service.setSavingsAccount(this.loggedInSavingsAccount); 
              },
              error=> console.log(error),
          ()=> console.log("Finished"))
          });
      });
  }
}