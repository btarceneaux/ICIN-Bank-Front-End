import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  // We have to do DI for HTTP Client.
  constructor(public http:HttpClient) { }

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

}