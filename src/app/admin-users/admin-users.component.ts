import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private service:UserService, private router:Router) { }

  myUserArray:User[] = []; 
  tmpUserArray:User[] = []; 
  checkingAccount:CheckingAccount = new CheckingAccount(0, 0);
  savingsAccount:SavingsAccount = new SavingsAccount(0);
  checkingAccountNumber:number = 0;
  savingsAccountNumber:number = 0;
  user:User = new User("","","","","",0);
  msg:string = "";

  ngOnInit(): void 
  {
      //Grab all of the users stored in the system
      this.service.getAllUsers().subscribe
      (result =>
        {
          this.myUserArray = result;
        },
        error=> console.log(error),
        ()=> 
        {
          console.log("Finished loading results. ")
          console.log(this.myUserArray)

          for(let record of this.myUserArray)
          {

            //Get information here
            this.service.getCheckingAccountInfo(record.userId.toString()).subscribe
            (result => 
              {
                console.log("Checking account number : ")
                record.checkingAccountNumber = result.id!
                console.log(record)
              },
              error => console.log(error),
              ()=> 
              {
                this.service.getSavingsAccountInfo(record.userId.toString()).subscribe
                (savingsResut => 
                {
                  console.log("Savings account number : ")
                  record.savingsAccountNumber = savingsResut.id!
                  console.log(record)
                },
                error => console.log(error),
                ()=> console.log("Finished loading information")
                )
              }
            )
            
            record.checkingAccountNumber = 1
            console.log(record.checkingAccountNumber)
          }

        }
      )
  }

  activateOrDeactivateUser(userId:number)
  {
    this.service.getFullUserDetails(userId.toString()).subscribe
    (userResult => 
      {
        this.user = userResult;
      },
      error=> console.log(error),
      ()=>
      {
        this.service.enableOrDisableAccount(this.user).subscribe
        (enabledResult=> 
        {
          console.log(enabledResult);
        },
        error => console.log(error),
        ()=> location.reload()
        )
      }
    )
    
  }

}
