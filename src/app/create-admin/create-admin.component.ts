import {Component, OnDestroy, OnInit} from '@angular/core';
import {EPermission} from "../enum/EPermission";
import {ShopkeeperService} from "../shopkeeper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit, OnDestroy{

  constructor(private shopKeeper: ShopkeeperService) {
    this.sub1 = this.shopKeeper.$create_Error.subscribe({
        next: value => {this.ERROR_FROM_HTTP_REQUEST = value},error: err => {}
      }
    )
  }
  sub1: Subscription;

  email!: string;
  password!: string;
  permission: string = "";
  errorNotSelecting: string = "";
  ERROR_FROM_HTTP_REQUEST: string = "";


  ngOnInit(): void {}

  onCreate() {
    // console.log("Email: " + this.email);
    // console.log("Password: " + this.password);
    if (this.permission === "") {
      this.errorNotSelecting = "PLEASE SELECT."
    }
    if (this.permission === "Customer") {
      this.errorNotSelecting = ""
      this.createCustomer();
    }
    if (this.permission === "Admin") {
      this.errorNotSelecting = ""
      this.createAdmin();
    }
    if (this.permission === "ShopKeeper") {
      this.errorNotSelecting = ""
      this.createShopKeeper();
    }
  }

  createAdmin() {
    this.shopKeeper.onCreateAdmin(this.email,this.password,EPermission.ADMIN);
  }
  createCustomer() {
    this.shopKeeper.onCreateCustomer(this.email,this.password,EPermission.CUSTOMER);
  }
  createShopKeeper() {
    this.shopKeeper.onCreateShopKeeper(this.email,this.password,EPermission.SHOPKEEPER);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
