import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customer.service";
import {ShopkeeperService} from "../shopkeeper.service";
import {IProduct} from "../interfaces/Products/IProduct";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private customerService: CustomerService, private productService: ShopkeeperService) {
    this.customerService.$cart.subscribe({
      next: value => {console.log(value)
      },error: err => {}
    })
    this.customerService.$checkOut.subscribe({
      next: value => {
        console.log("NEW: ");
        console.log( value)
        this.checkOutLists = value;
      },error: err => {}
    })
    this.addTotal();
  }
  checkOutLists: IProduct[] | null= [];
  totalPrice: number = 1;
  addTotal() {
    if (this.checkOutLists != null) {
      for(let i = 0; i < this.checkOutLists.length; i++) {
        let price = this.checkOutLists[i].defaultPrice * this.checkOutLists[i].q;
        this.totalPrice += price;
        price = 0;
      }
    }
  }
  ngOnInit(): void {}


  onCheckOut() {
    this.customerService.$cart.next(false);
    this.customerService.$checkOut.next(null);
  }
}
