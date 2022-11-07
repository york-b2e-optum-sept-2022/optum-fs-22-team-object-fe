import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  public createAccount(account: IAccount): Observable<any> {
    return this.httpClient.post("http://localhost:3000/api/user/register", account,{responseType: 'text'}) as Observable<any>;
  }


}
