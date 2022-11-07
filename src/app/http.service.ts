import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  public createAccount(account: IAccount): Observable<IAccount> {
    return this.httpClient.post("http://localhost:8080/api/user/register", account) as Observable<IAccount>;
  }


}
