import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { CheckingAccount } from './checking-account';
import { SavingsAccount } from './savings-account';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void 
  {
  }

  checkingAccount:CheckingAccount = this.service.checkingAccount;
  savingsAccount:SavingsAccount = this.service.savingsAccount;
}