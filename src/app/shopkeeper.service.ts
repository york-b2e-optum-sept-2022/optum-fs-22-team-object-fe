import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {EPermission} from "./enum/EPermission";
import {IAccount} from "./interfaces/IAccount";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {

  constructor(private httpService: HttpService) {}
  private account!: IAccount;
  $create_Error = new BehaviorSubject<string>("");
  $isCreate = new BehaviorSubject<boolean>(false);
  HTTPSTATUS_CONFLICT:string = "Account with email already exists";
  HTTPSTATUS_FORBIDDEN: string = "Account creation of high permission must be made by administrator";
  OTHER_HTTP_ERROR: string = "PLEASE TRY AGAIN LATER.";

  public onCreateCustomer(email: string, password: string, permission: EPermission) {
    this.account.email = email;
    this.account.password = password;
    this.account.permission = permission;
    this.httpService.createAccount(this.account).subscribe({
      next: value => {
        this.$isCreate.next(true);
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
  public onCreateShopKeeper(email: string, password: string, permission: EPermission) {
    this.account.email = email;
    this.account.password = password;
    this.account.permission = permission;
    this.httpService.createAccount(this.account).subscribe({
      next: value => {
        this.$isCreate.next(true);
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
    this.account.email = email;
    this.account.password = password;
    this.account.permission = permission;
    this.httpService.createAccount(this.account).subscribe({
      next: value => {
        this.$isCreate.next(true);
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
