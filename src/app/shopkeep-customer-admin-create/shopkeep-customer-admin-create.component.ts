import {Component, OnInit} from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {IAccount} from "../interfaces/IAccount";
import {EPermission} from "../enum/EPermission";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-shopkeep-customer-admin-create',
  templateUrl: './shopkeep-customer-admin-create.component.html',
  styleUrls: ['./shopkeep-customer-admin-create.component.css']
})
export class ShopkeepCustomerAdminCreateComponent implements OnInit {
  permission: string = "";
  email: string = "";
  password: string = "";
  currentID: string = "";

  constructor(private adminService: AdminService) {
    this.adminService.$currentID.subscribe({
      next: value => {
        this.currentID = value
        this.adminService.getAllAccounts(value);
      }
    });

  }





  ngOnInit(): void {}

  onCreate() {
     let account: IAccount = {
      email: this.email,
      password: this.password,
      PermissionLevel: null,
      userID: this.currentID,
       permission: "",
       id: ""
    }

   if (this.permission  === "Admin") {
     console.log("1");
     account.PermissionLevel = EPermission.ADMIN;
     account.permission = EPermission.ADMIN
     console.log(account.PermissionLevel);
     this.adminService.onCreateCustomer(account);

   }
    if (this.permission  === "Customer") {
      console.log("2");

      account.PermissionLevel = EPermission.CUSTOMER;
      account.permission = EPermission.CUSTOMER
      console.log(account.PermissionLevel);
      this.adminService.onCreateCustomer(account);

    }
    if (this.permission  === "ShopKeeper") {
      console.log("3");

      account.PermissionLevel = EPermission.SHOPKEEPER;
      account.permission = EPermission.SHOPKEEPER;
      console.log(account.PermissionLevel);
      this.adminService.onCreateCustomer(account);
    }

  }

}
