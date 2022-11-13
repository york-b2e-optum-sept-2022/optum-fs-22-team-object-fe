import {Injectable, OnDestroy} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first, Subject, Subscription} from "rxjs";
import {IAccount} from "./interfaces/Accounts/IAccount";
import {IDelete} from "./interfaces/Accounts/IDelete";
import {IAdmin} from "./interfaces/Accounts/IAdmin";
import {IUpdateLocal} from "./interfaces/Accounts/IUpdateLocal";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) {}

  $create_Error = new BehaviorSubject<string>("");
  $isCreate = new BehaviorSubject<boolean>(false);
  HTTPSTATUS_CONFLICT: string = "Account with email already exists";
  HTTPSTATUS_FORBIDDEN: string = "Account creation of high permission must be made by administrator";
  OTHER_HTTP_ERROR: string = "PLEASE TRY AGAIN LATER.";
  LOGIN_ERROR: string = "Please try it again. Make sure your email and password are correct."
  DELETE_ERROR: string = "You cannot delete your own account as an admin."
  DELETE_ERROR1: string = "Could not find account with that email"
  $isLogged = new BehaviorSubject<boolean>(false);
  $currentID = new BehaviorSubject<string>("");
  $permission = new BehaviorSubject<string>("");
  $array = new Subject<IAccount[]>();
  $main_Admin_Create = new BehaviorSubject<boolean>(false);
  $current_Email = new BehaviorSubject<string>("");
  localCurrentID: string = "";




  public onCreateCustomer(account:IAccount) {
    //Create for customer is working great.

    this.httpService.createAccount(account).pipe(first()).subscribe({
      next: value => {
        this.$isCreate.next(false);
        this.$create_Error.next("");
        this.getAllAccounts(this.localCurrentID);
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

  //Find a way for shopkeeper

  public loginAccount(email: string, password: string) {
    let account: IAccount = {
      email: email,
      password: password,
      userID: "",
      PermissionLevel: null,
      permission: "",
      id: ""
    }
    this.$current_Email.next(email);
    this.httpService.loginAccount(account).pipe(first()).subscribe({
      next: value => {
        this.$currentID.next(value); //getting the current ID when they log in.
        this.localCurrentID = value;
        this.$isLogged.next(true)
        this.httpService.getMyPermissionLevel(value).pipe(first()).subscribe({ // getting user's permission.
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
    this.httpService.getAllAccounts(userID).pipe(first()).subscribe({
      next: value => {
        this.$array.next(value);
      },error: err => {}
    });
  }

  public deleteAccount(account: IDelete) {
    this.httpService.deleteAccount(account).pipe(first()).subscribe({
      next: value => {
        console.log(value);
        this.getAllAccounts(this.localCurrentID);
      },error: err => {
        if (err.status === 403) {
          this.$create_Error.next(this.DELETE_ERROR);
          return;
        }
        if (err.status === 404) {
          this.$create_Error.next(this.DELETE_ERROR1)
          return;
        }
        this.$create_Error.next("You do not have permission to delete another account");
      }
    })
  }
  public findAccount(userID: string,email:string) {
    this.httpService.findAccount(userID,email).pipe(first()).subscribe({
      next: value => {
        console.log(value);
        return value;
      }, error: err => {console.log(err)}
    })
  }
  public updateAdminAccount(account: IAdmin) {
    this.httpService.updateAdminAccount(account).pipe(first()).subscribe({
      next: value => {console.log(value);
        this.getAllAccounts(account.userID);
      },error: err => {console.log(err)}
    })
  }
  public updateLocalAccount(account: IUpdateLocal) {
    this.httpService.updateLocalAccount(account).pipe(first()).subscribe({
      next: value => {
        console.log("LOCAL: " + value)
        this.getAllAccounts(account.currentID);
      },error: err => {console.log(err)}
    });
  }


}
