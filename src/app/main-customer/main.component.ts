import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IDelete} from "../interfaces/Accounts/IDelete";
import {IProduct} from "../interfaces/Products/IProduct";
import {IProductCount} from "../interfaces/Products/IProductCount";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {CustomerService} from "../customer.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private adminService: AdminService, private shopKeeper: ShopkeeperService, private customerService: CustomerService) {
    this.adminService.$currentID.subscribe({
      next: value => {
        console.log(value)
        this.userID = value;
      },error: err => {console.log(err)}
    })
    this.adminService.$current_Email.subscribe({
      next: value => {
        console.log("EMAIL: " + value)
        this.email = value;
      },error: err => {}
    })
    this.shopKeeper.getAllProducts(this.userID);
    this.shopKeeper.products.subscribe({
      next: value => {
        this.products = value;
        console.log(value)},error: err=> {console.log(err)}

    })
  }

  ngOnInit(): void {}
  products: IProduct[] = [];
  email: string = "";
  userID: string = "";
  isCart: boolean = false;
  isAccount: boolean = false;
  cartProducts: IProduct[] = [];
  cartItemCount: IProductCount[] = [];
  totalPrice: number = 0;




  addCart(i: number) {
    if (this.cartProducts.length === 0) {
      this.cartProducts.push(this.products[i]);
      const output: IProductCount = {
        productID: this.products[i].productID,
        number: 1,
        userID: this.userID,
      }
      this.totalPrice = this.products[i].defaultPrice;
      console.log("HELLO1")
      this.cartItemCount.push(output)
      this.customerService.putCart(output);
      this.cartProducts[0].q = output.number;
      console.log(this.cartItemCount);
      console.log(this.cartProducts);
      return;
    }

    for (let a = 0; a < this.cartItemCount.length; a++) {
      if (this.products[i].productID === this.cartItemCount[a].productID) {
        this.cartItemCount[a].number += 1;
        this.cartProducts[a].q += 1;
        console.log("HELLO2")
        console.log(this.cartItemCount);
        this.customerService.putCart(this.cartItemCount[a]);
        this.totalPrice += this.products[i].defaultPrice;
        console.log(this.cartProducts);
        return;
      }
    }
    this.cartProducts.push(this.products[i]);
    const output: IProductCount = {
      productID: this.products[i].productID,
      number: 1,
      userID: this.userID,
    }
    this.cartItemCount.push(output);
    this.cartProducts[this.cartProducts.length -1].q = 1;
    console.log("HELLO3")
    console.log(this.cartItemCount.length);
    this.totalPrice += this.products[i].defaultPrice;
    this.customerService.putCart(this.cartItemCount[this.cartItemCount.length - 1]);
    console.log(this.cartProducts);

  }




  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  onCart() {
    this.isAccount = false;
    this.isCart = true;
  }
  onAccount() {
    this.isCart = false;
    this.isAccount = true;
  }
  onDeleteAccount() {
    const account: IDelete = {
      email: this.email,
      userID: this.userID
    }
    this.adminService.deleteAccount(account);
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }


  onDeleteCart(i: number) {
    for(let g = 0; g < this.cartItemCount.length; g++) {
      if (this.cartItemCount[g].productID === this.products[i].productID && this.cartItemCount[g].number != 0) {
        this.totalPrice -= this.products[i].defaultPrice;
        this.cartItemCount[g].number -= 1;
        this.cartProducts[g].q -= 1;
        return;
      }
      if (this.cartItemCount[g].productID === this.products[i].productID &&  this.cartItemCount[g].number === 0) {
        delete this.cartProducts[g];
      }
    }
  }
}
