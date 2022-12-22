import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor(private router:Router, private service: UserService) { }
msg:string = "";
checkingAccountMessage:any;
loggedInCheckingAccount:CheckingAccount = new CheckingAccount(0, 0);
loggedInSavingsAccount:SavingsAccount = new SavingsAccount(0);
loginId:string = "";

  ngOnInit(): void 
  {
  }


  adminLogin(data: any) 
  {
    //First check to see if the admin account is being used.
    if((data.emailAddress != "admin@gmail.com") || (data.password == ""))
    {
      alert("Error! The user account or password entered is not valid! Please try again");
    }
    else
    {
      this.service.loginUser(data.emailAddress, data.password).subscribe(result=>
        {
  
          if(result > "0" )
          {
            sessionStorage.setItem("myUserId", result);
  
            this.msg=="Login successful!";
            this.router.navigate(["admin"]);
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

  loginUser(data:any)
  {
    if(data.emailAddress == "admin@gmail.com")
    {
      alert("No administrative login is allowed here! Please try again.");
    }
    else
    {
      this.service.loginUser(data.emailAddress, data.password).subscribe
      (result=>
        {
          console.log("result is ")
          console.log(result);
  
          if(result > "0" )
          {
            this.service.getFullUserDetails(result).subscribe
            (userResults =>
              {
                let loggedInUser = null
                loggedInUser = userResults;
                console.log("User details from login are ")
                console.log(loggedInUser)

                console.log("Active vs inactive")
                console.log(loggedInUser.activated)
                if(loggedInUser.activated)
                {
                  sessionStorage.setItem("myUserId", loggedInUser.userId.toString());
                  this.msg=="Login successful!";
                  this.router.navigate(["userHome"]);
                }
                else
                {
                  alert("This user must first be authorized before you can log in and use the application.")
                  location.reload();
                }
              },
              error=>console.error(),
              ()=>
              {
                console.log("User details finished")
              }
            )
          }
          else
          {
            alert("Invalid username or password combination. Please try again!")
          }
        },
        error=>console.log(error), 
        ()=> 
        {
          console.log("Finished") 
        });
    }
  }

}
