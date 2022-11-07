import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {EPermission} from "./enum/EPermission";
import {IAccount} from "./interfaces/IAccount";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {

  constructor(private httpService: HttpService) {
  }

  $create_Error = new BehaviorSubject<string>("");
  $isCreate = new BehaviorSubject<boolean>(false);
  HTTPSTATUS_CONFLICT: string = "Account with email already exists";
  HTTPSTATUS_FORBIDDEN: string = "Account creation of high permission must be made by administrator";
  OTHER_HTTP_ERROR: string = "PLEASE TRY AGAIN LATER.";

  public onCreateCustomer(email: string, password: string, permission: EPermission) {
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission
    };
    //
    // console.log("SHOPER: " + account.email);
    // console.log("SHOPER: " + account.password);
    // console.log("SHOPER: " + account.permission);

    this.httpService.createAccount(account).subscribe({
      next: value => {
        // this.$isCreate.next(true);
        // this.$create_Error.next("");
        console.log("Success: " + value);

      }, error: err => {
        console.log(err);
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
        }

        // if (err.status === 409) {
        // this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
        // }
        // if (err.status === 403) {
        // this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
        // }
        // this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
}
  public onCreateShopKeeper(email: string, password: string, permission: EPermission) {
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission
    };

    // console.log("SHOPER1: " + account.email);
    // console.log("SHOPER1: " + account.password);
    // console.log("SHOPER1: " + account.permission);

    this.httpService.createAccount(account).subscribe({
      next: value => {
        this.$isCreate.next(true);
        this.$create_Error.next("");
        }, error: err => {
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
        }
        if (err.status === 403) {
          this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
  }
  public onCreateAdmin(email: string, password: string, permission: EPermission) {
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission
    };

    // console.log("SHOPER2: " + account.email);
    // console.log("SHOPER2: " + account.password);
    // console.log("SHOPER2: " + account.permission);

    this.httpService.createAccount(account).subscribe({
      next: value => {
        this.$isCreate.next(true);
        this.$create_Error.next("");
        }, error: err => {
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
        }
        if (err.status === 403) {
          this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
  }
}
