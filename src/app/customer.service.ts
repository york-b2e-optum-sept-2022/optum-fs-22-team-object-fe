import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IDelete} from "./interfaces/Accounts/IDelete";
import {first} from "rxjs";
import {IAdmin} from "./interfaces/Accounts/IAdmin";
import {IProductCount} from "./interfaces/Products/IProductCount";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) {}

  public putCart(cart: IProductCount) {
    this.httpService.putCart(cart).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}
    })
  }


}
