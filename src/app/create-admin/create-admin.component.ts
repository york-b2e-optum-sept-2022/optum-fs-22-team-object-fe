import { Component, OnInit } from '@angular/core';
import {EPermission} from "../enum/EPermission";
import {getLocaleExtraDayPeriodRules} from "@angular/common";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  constructor() {}

  email!: string;
  password!: string;
  permission: string = "";
  errorNotSelecting: string = "";

  ngOnInit(): void {}

  onCreate() {
    if (this.permission === "") {
      this.errorNotSelecting = "PLEASE SELECT."
    }
    if (this.permission === "Customer") {
      this.createCustomer();
    }
    if (this.permission === "Admin") {
      this.createAdmin();
    }
    if (this.permission === "ShopKeeper") {
      this.createShopKeeper();
    }
  }

  createAdmin() {
    console.log("ADMIN");
  }
  createCustomer() {
    console.log("Customer");
  }
  createShopKeeper() {
    console.log("SHOP KEEPER");
  }
}
