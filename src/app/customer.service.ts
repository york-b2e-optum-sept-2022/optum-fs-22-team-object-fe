import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IDelete} from "./interfaces/Accounts/IDelete";
import {BehaviorSubject, first, Subject} from "rxjs";
import {IAdmin} from "./interfaces/Accounts/IAdmin";
import {IProductCount} from "./interfaces/Products/IProductCount";
import {IProduct} from "./interfaces/Products/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) {}
  $checkOut = new BehaviorSubject<IProduct[] | null>(null);
  $checkOutCount = new Subject();
  $cart = new BehaviorSubject<boolean>(false);


  public putCart(cart: IProductCount) {
    this.httpService.putCart(cart).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}
    })
  }


}
