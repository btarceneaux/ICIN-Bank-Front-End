import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit 
{
  msg:string = "";

  constructor(private router:Router, private service: UserService) { }

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
}