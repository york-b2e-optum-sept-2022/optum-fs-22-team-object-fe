import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {EPermission} from "./enum/EPermission";
import {IAccount} from "./interfaces/IAccount";
import {BehaviorSubject} from "rxjs";
import {IAccountDisplay} from "./interfaces/IAccountDisplay";

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
  LOGIN_ERROR: string = "Please try it again. Make sure your email and password are correct."
  $isLogged = new BehaviorSubject<boolean>(false);
  $currentID = new BehaviorSubject<string>("");
  $permission = new BehaviorSubject<string>("");
  $array = new BehaviorSubject<IAccount[] | null>(null);


  public onCreateCustomer(email: string, password: string, permission: EPermission) {
   //Create for customer is working great.
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission,
      userID: ""
    };

    this.httpService.createAccount(account).subscribe({
      next: value => {
        this.$isCreate.next(false);
        this.$create_Error.next("");
        console.log("Success: " + value);
      }, error: err => {
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
          return;
        }
        if (err.status === 403) {
        this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
        return;
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
}
//Need to find a way for Admin to create.
  public onCreateShopKeeper(email: string, password: string, permission: EPermission) {
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission,
      userID: ""
    };

    this.httpService.createAccount(account).subscribe({
      next: value => {
        this.$isCreate.next(false);
        this.$create_Error.next("");
        }, error: err => {
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
          return;
        }
        if (err.status === 403) {
          this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
          return;
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
  }
  //Find a way for shopkeeper
  public onCreateAdmin(email: string, password: string, permission: EPermission) {
    let account: IAccount = {
      email: email,
      password: password,
      permission: permission,
      userID: ""
    };

    this.httpService.createAccount(account).subscribe({
      next: value => {
        this.$isCreate.next(false);
        this.$create_Error.next("");
        }, error: err => {
        if (err.status === 409) {
          this.$create_Error.next(this.HTTPSTATUS_CONFLICT);
          return;
        }
        if (err.status === 403) {
          this.$create_Error.next(this.HTTPSTATUS_FORBIDDEN);
          return;
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    })
  }
  public loginAccount(email: string, password: string) {
    let account: IAccount = {
      email: email,
      password: password,
      userID: "",
      permission: ""
    }
    this.httpService.loginAccount(account).subscribe({
      next: value => {
        this.$currentID.next(value); //getting the current ID when they log in.
        this.$isLogged.next(true)
        this.httpService.getMyPermissionLevel(value).subscribe({ // getting user's permission.
          next: value1 => {
            this.$permission.next(value1);
          }, error: err => {console.log(err)}
        });
      },error: err => {
        if (err.status === 400) {
          this.$create_Error.next(this.LOGIN_ERROR);
          return;
        }
        this.$create_Error.next(this.OTHER_HTTP_ERROR);
      }
    });
  }
  public getAllAccounts(userID: string) {
    this.httpService.getAllAccounts(userID).subscribe({
      next: value => {
        this.$array.next(value);
      },error: err => {}
    });
  }
  // public deleteAccount()





}
