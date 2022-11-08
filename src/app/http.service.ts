import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";
import {IAdmin} from "./interfaces/IAdmin";
import {IDelete} from "./interfaces/IDelete";
import {IAccountDisplay} from "./interfaces/IAccountDisplay";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  //WORKING
  public createAccount(account: IAccount): Observable<string> {
    return this.httpClient.post("http://localhost:3000/api/user/register", account,{responseType: 'text'}) as Observable<string>;
  }
  public loginAccount(account: IAccount): Observable<string> {
    return this.httpClient.post("http://localhost:3000/api/user/login",account, {responseType: 'text'}) as Observable<string>;
  }
  public getMyPermissionLevel(userID: string): Observable<string> {
    return this.httpClient.get(`http://localhost:3000/api/user/permission?userID=${userID}`, {responseType: 'text'}) as Observable<string>;
  }
  public updateLocalAccount(account: IAccount ): Observable<string> {
    //Make sure there's the userID that they want to update.
    //Have to write an error that if they can't change their own account.
    //this is updating customer/shopkeeper accounts

    return this.httpClient.put("http://localhost:3000/api/user/update", account, {responseType: 'text'}) as Observable<string>
  }
  public updateAdminAccount(account: IAdmin)
  //admin can change admin only
  //working as it should
  //this is updating admin's information
  {
    return this.httpClient.put("http://localhost:3000/api/user/update/admin",account)
  }

  public deleteAccount(account: IDelete){
    //Something new I learned.
    //Source from : https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: account.userID,
        email: account.email
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/user/delete", options);
  }

  //TESTING
  public findAccount(userID: string, email: string): Observable<IAccount> {
    //only admin can search accounts.
    return this.httpClient.get(`http://localhost:3000/api/user/find?userID=${userID}&email=${email}`) as Observable<IAccount>;
  }
  public getAllAccounts(userID: string): Observable<IAccount[]> {
    //only admin can see this listing.
    return this.httpClient.get(`http://localhost:3000/api/user/all?userID=${userID}`) as Observable<IAccount[]>;
  }



}
