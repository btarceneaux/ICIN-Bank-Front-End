import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //Must use DI for Router in order to navigate
  constructor(public router:Router, private service: UserService) { }
  
  storeMessage:string="";

  ngOnInit(): void 
  {
    
  }

  createAccount(data: any): void
  {
    // Store the incoming data in a user object.
    let user = new User(data.firstName, data.lastName, data.phoneNumber, data.emailAddress, data.password, data.id);
    
    // Call the rest API to store the user.
    this.service.storeUser(user).subscribe(result=>
      { 
        this.storeMessage = result;
        
        if(result == "successful")
        {
          console.log("account creation")
          this.storeMessage=="Account creation successful!";
          
        }
      }, 
      error=>this.storeMessage=error, 
    ()=>
    {
      console.log(this.storeMessage);
      this.router.navigate([""]);
    }
      );
  }
}