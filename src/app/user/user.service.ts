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
  response:any;

  // We have to do DI for HTTP Client.
  constructor(public http:HttpClient) { }


  confirmSavingsCheckbookStatus(mySavingsAccount:SavingsAccount)
  {
    mySavingsAccount.confirmed = "Confirmed";
    let api = "http://localhost:8081/approveSavingsCheckbookRequest";

    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }

  confirmCheckingCheckbookStatus(myCheckingAccount:CheckingAccount)
  {
    myCheckingAccount.confirmed = "Confirmed";
    let api = "http://localhost:8081/approveCheckingCheckbookRequest";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  requestCheckingAccountCheckbook(myCheckingAccount:CheckingAccount)
  {
    let api = "http://localhost:8081/requestCheckingCheckbook";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  requestSavingsaccountCheckbook(mySavingsAccount:SavingsAccount)
  {
    let api = "http://localhost:8081/requestSavingsCheckbook";

    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }


  getCheckbookRequestsForSavingsAccount():Observable<any[]>
  {
    let api = "http://localhost:8081/getSavingsAccountCheckbookRequests/";
    return this.http.get<any[]>(api, {responseType:'json'});
  }

  getCheckbookRequestsForCheckingAccount():Observable<any[]>
  {
    let api = "http://localhost:8081/getCheckingAccountCheckbookRequests/";
    return this.http.get<any[]>(api, {responseType:'json'});
  }

  getTransactionByAccountId(accountId:string):Observable<any[]>
  {
    let api = "http://localhost:8081/getTransactions/" + accountId;
    return this.http.get<any[]>(api,{responseType:'json'});
  }

  getAllUsers()
  {
    this.http.get("http://localhost:8081/register").subscribe(data=>console.log, 
    error=>console.log(error), 
    ()=>console.log("completed"))
  }

  depositIntoChecking(myCheckingAccount:CheckingAccount, accountId:number):Observable<string>
  {
    let api:string = "http://localhost:8081/checkingDeposit";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  withdrawFromChecking(myCheckingAccount:CheckingAccount, accountId:number):Observable<string>
  {
    let api:string = "http://localhost:8081/checkingWithdrawal";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  depositIntoSavings(mySavingsAccount: SavingsAccount, accountId: number) 
  {
    let api:string = "http://localhost:8081/savingsDeposit";
    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }

  withdrawFromSavings(mySavingsAccount: SavingsAccount, accountId: number) 
  {
    let api:string = "http://localhost:8081/savingsWithdrawal";
    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }
  
  storeUser(user:User):Observable<string>
  {
    console.log("Service method user object equals --" + user);
    return this.http.post("http://localhost:8081/storeUser", user, {responseType:'text'});
  }

  loginUser(email:string, pass:string):Observable<string>
  {
    //Convert the username and password to a user object before sending it to the api endpoint.
    let myUser:User = new User("", "", "", email, pass, 0);

    let api:string = "http://localhost:8081/loginUser";
    
    return this.http.post(api, myUser, {responseType:'text'});
  }

  getCheckingAccountInfo(id:string):Observable<CheckingAccount>
  {
    let api:string = "http://localhost:8081/getCheckingAccountInfo/" + id;
    return this.http.get<CheckingAccount>(api,{responseType:'json'});
  }
  
  getSavingsAccountInfo(id:string):Observable<SavingsAccount>
  {
    let api:string = "http://localhost:8081/getSavingsAccountInfo/" + id;
    return this.http.get<SavingsAccount>(api,{responseType:'json'});
  }

  getFullUserDetails(id:string):Observable<User>
  {
    let api:string = "http://localhost:8081/getUser/" + id;
    console.log("API endpoint is : " +  api);
    return this.http.get<User>(api, {responseType:'json'});
  }

  getUserByAccountId(id:string, accountType:string):Observable<User>
  {
    let api:string = "http://localhost:8081/getUserByAccountId/" + id + "/" + accountType;
    
    return this.http.get<User>(api, {responseType:'json'});
  }
}