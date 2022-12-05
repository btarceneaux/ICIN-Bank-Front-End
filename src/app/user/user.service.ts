import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { CheckingAccount } from '../user-home/checking-account';
import { SavingsAccount } from '../user-home/savings-account';

@Injectable({
  providedIn: 'root'
})

export class UserService 
{
  checkingAccount:CheckingAccount = new CheckingAccount(0,0);
  savingsAccount:SavingsAccount = new SavingsAccount(0,0);
  loggedInUser:User = new User("", "", "", "", "");
  response:any;


  // We have to do DI for HTTP Client.
  constructor(public http:HttpClient) { }


  setCheckingAccount(myCheckingAccount:CheckingAccount)
  {
    this.checkingAccount = myCheckingAccount;
  }

  setSavingsAccount(mySavingsAccount:SavingsAccount)
  {
    this.savingsAccount = mySavingsAccount;
  }

  getAllUsers()
  {
    this.http.get("http://localhost:8081/register").subscribe(data=>console.log, 
    error=>console.log(error), 
    ()=>console.log("completed"))
  }
  
  storeUser(user:User):Observable<string>
  {
    console.log("Service method user object equals --" + user);
    return this.http.post("http://localhost:8081/storeUser", user, {responseType:'text'});
  }

  loginUser(email:string, pass:string):Observable<string>
  {
    //Convert the username and password to a user object before sending it to the api endpoint.
    let myUser:User = new User("", "", "", email, pass);

    let api:string = "http://localhost:8081/loginUser";
    
    return this.http.post(api, myUser, {responseType:'text'});
  }

  getCheckingAccountInfo(myUser:User):Observable<CheckingAccount>
  {
    this.loggedInUser.setEmailAddress = myUser.emailAddress;
    this.loggedInUser.setPassword = myUser.password;
    this.loggedInUser.setId = myUser.id!;
    let api:string = "http://localhost:8081/getCheckingAccountInfo/" + myUser.id;
    return this.http.get<CheckingAccount>(api,{responseType:'json'});
  }
  
  getSavingsAccountInfo(myUser:User):Observable<SavingsAccount>
  {
    let api:string = "http://localhost:8081/getSavingsAccountInfo/" + myUser.id;
    return this.http.get<SavingsAccount>(api,{responseType:'json'});
  }

}