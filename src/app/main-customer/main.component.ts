import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IDelete} from "../interfaces/Accounts/IDelete";
import {IProduct} from "../interfaces/Products/IProduct";


@Component({
  selector: 'app-main-customer',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private adminService: AdminService, private shopKeeper: ShopkeeperService) {
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







}
