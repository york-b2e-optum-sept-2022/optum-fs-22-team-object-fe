import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  public createAccount(account: IAccount): Observable<string> {
    return this.httpClient.post("http://localhost:3000/api/user/register", account,{responseType: 'text'}) as Observable<string>;
  }
  public loginAccount(account: IAccount): Observable<String> {
    return this.httpClient.post("http://localhost:3000/api/user/login",account, {responseType: 'text'}) as Observable<String>;
  }


}
