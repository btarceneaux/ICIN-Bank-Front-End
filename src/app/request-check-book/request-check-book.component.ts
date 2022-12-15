import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void 
  {
    
  }

  selectEvent(event:any)
  {
    console.log("An event fired.");
    
    let message = "";
    message = event.target.value;
    let button = <HTMLInputElement> document.getElementById('btn');

    if(message == "checking")
    {
      this.msg = this.checkingMessage;
      button.disabled = false;
    }
    else if(message == "savings")
    {
      this.msg = this.savingsMessage;
      button.disabled = false;
    }
    else
    {
      button.disabled = true;
      this.msg = "";
    }
    //We will have to do something else with this code once the admin portal is complete.
  }

  navigateHome()
  {
    alert("The request for a new checkbook has been sent.");
    this.router.navigate(["home"]);
  }
  
}
