import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private service:UserService, private router:Router) { }

  ngOnInit(): void 
  {
      //Grab all of the users stored in the system
      this.service.getAllUsers().subscribe
      (result =>
        {
          console.log("Let's see what comes back");
          console.log(result);
        },
        error=> console.log(error),
        ()=>console.log("Fetching")
      )
  }

}
