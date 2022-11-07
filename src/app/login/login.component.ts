import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router, private service: UserService) { }
  storeMessage:string = "";

  ngOnInit(): void {
  }

  loginUser(data:any)
  {
    console.log(data.emailAddress);
    console.log(data.password);

    this.service.loginUser(data.emailAddress, data.password).subscribe(result=>
      {
        this.storeMessage = result;

        if(result == "successful")
        {
          console.log("login success")
          this.storeMessage=="Login successful!";
        }
      },
      error=>this.storeMessage=error, 
      ()=>
    {
      console.log(this.storeMessage);
      this.router.navigate(["home"]);
    }
    );
  }

}
