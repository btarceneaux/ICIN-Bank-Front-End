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
  baseurl = "http://icin-bank-frontend.s3-website-us-west-2.amazonaws.com"
  response:any;

  // We have to do DI for HTTP Client.
  constructor(public http:HttpClient) { }

  enableOrDisableAccount(user:User)
  {
    let api = this.baseurl + "/activateOrDeactivateUser";

    return this.http.post(api, user, {responseType:'text'});
  }

  confirmSavingsCheckbookStatus(mySavingsAccount:SavingsAccount)
  {
    mySavingsAccount.confirmed = "Confirmed";
    let api = this.baseurl + "/approveSavingsCheckbookRequest";

    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }

  confirmCheckingCheckbookStatus(myCheckingAccount:CheckingAccount)
  {
    myCheckingAccount.confirmed = "Confirmed";
    let api = this.baseurl + "/approveCheckingCheckbookRequest";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  requestCheckingAccountCheckbook(myCheckingAccount:CheckingAccount)
  {
    let api = this.baseurl + "/requestCheckingCheckbook";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  requestSavingsaccountCheckbook(mySavingsAccount:SavingsAccount)
  {
    let api = this.baseurl + "/requestSavingsCheckbook";

    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }


  getCheckbookRequestsForSavingsAccount():Observable<any[]>
  {
    let api = this.baseurl + "/getSavingsAccountCheckbookRequests/";
    return this.http.get<any[]>(api, {responseType:'json'});
  }

  getCheckbookRequestsForCheckingAccount():Observable<any[]>
  {
    let api = this.baseurl + "/getCheckingAccountCheckbookRequests/";
    return this.http.get<any[]>(api, {responseType:'json'});
  }

  getTransactionByAccountId(accountId:string):Observable<any[]>
  {
    let api = this.baseurl + "/getTransactions/" + accountId;
    return this.http.get<any[]>(api,{responseType:'json'});
  }

  getAllUsers():Observable<any[]>
  {
    let api = this.baseurl + "/getUsers";
    return this.http.get<any[]>(api, {responseType:'json'});
  }

  depositIntoChecking(myCheckingAccount:CheckingAccount, accountId:number):Observable<string>
  {
    let api:string = this.baseurl + "/checkingDeposit";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  withdrawFromChecking(myCheckingAccount:CheckingAccount, accountId:number):Observable<string>
  {
    let api:string = this.baseurl + "/checkingWithdrawal";

    return this.http.post(api, myCheckingAccount, {responseType:'text'});
  }

  depositIntoSavings(mySavingsAccount: SavingsAccount, accountId: number) 
  {
    let api:string = this.baseurl + "/savingsDeposit";
    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }

  withdrawFromSavings(mySavingsAccount: SavingsAccount, accountId: number) 
  {
    let api:string = this.baseurl + "/savingsWithdrawal";
    return this.http.post(api, mySavingsAccount, {responseType:'text'});
  }
  
  storeUser(user:User):Observable<string>
  {
    console.log("Service method user object equals --" + user);
    let api:string = this.baseurl + "/storeUser";
    return this.http.post(api, user, {responseType:'text'});
  }

  loginUser(email:string, pass:string):Observable<string>
  {
    //Convert the username and password to a user object before sending it to the api endpoint.
    let myUser:User = new User("", "", "", email, pass, 0);

    let api:string = this.baseurl + "/loginUser";
    
    return this.http.post(api, myUser, {responseType:'text'});
  }

  getCheckingAccountInfo(id:string):Observable<CheckingAccount>
  {
    let api:string = this.baseurl + "/getCheckingAccountInfo/" + id;
    return this.http.get<CheckingAccount>(api,{responseType:'json'});
  }
  
  getSavingsAccountInfo(id:string):Observable<SavingsAccount>
  {
    let api:string = this.baseurl + "/getSavingsAccountInfo/" + id;
    return this.http.get<SavingsAccount>(api,{responseType:'json'});
  }

  getFullUserDetails(id:string):Observable<User>
  {
    let api:string = this.baseurl + "/getUser/" + id;
    console.log("API endpoint is : " +  api);
    return this.http.get<User>(api, {responseType:'json'});
  }

  getUserByAccountId(id:string, accountType:string):Observable<User>
  {
    let api:string = this.baseurl + "/getUserByAccountId/" + id + "/" + accountType;
    
    return this.http.get<User>(api, {responseType:'json'});
  }
}