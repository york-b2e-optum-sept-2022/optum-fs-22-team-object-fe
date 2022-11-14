import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IDelete} from "./interfaces/Accounts/IDelete";
import {first} from "rxjs";
import {IAdmin} from "./interfaces/Accounts/IAdmin";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) {}



  // public findAccount(userID: string,email:string) {
  //   this.httpService.findAccount(userID,email).pipe(first()).subscribe({
  //     next: value => {
  //       console.log(value);
  //       return value;
  //     }, error: err => {console.log(err)}
  //   })
  // }
  //
  // public deleteAccount(account: IDelete) {
  //   this.httpService.deleteAccount(account).pipe(first()).subscribe({
  //     next: value => {
  //       console.log(value);
  //     },error: err => {
  //       if (err.status === 403) {
  //         //this.$create_Error.next(this.DELETE_ERROR);
  //         return;
  //       }
  //       if (err.status === 404) {
  //         //this.$create_Error.next(this.DELETE_ERROR1)
  //         return;
  //       }
  //       //this.$create_Error.next("You do not have permission to delete another account");
  //     }
  //   })

}
