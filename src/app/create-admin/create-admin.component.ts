import {Component, OnDestroy, OnInit} from '@angular/core';
import {EPermission} from "../enum/EPermission";
import {ShopkeeperService} from "../shopkeeper.service";
import {Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";

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
    );
    this.shopKeeper.$permission.subscribe({
      next: value => {
        console.log("FROM HERE: " + value)
        this.permission_login = true;
      }
    })
  }

  permission_login: boolean = false;

  sub1: Subscription;
  email!: string;
  password!: string;
  permission: string = "";
  errorNotSelecting: string = "";
  ERROR_FROM_HTTP_REQUEST: string = "";




  ngOnInit(): void {}

  onCreate() {
    // if (this.permission_login) {
    //   if (this.permission === "") {
    //     this.errorNotSelecting = "PLEASE SELECT."
    //   }
    //   if (this.permission === "Customer") {
    //     this.errorNotSelecting = ""
    //     this.createCustomer();
    //   }
    //   if (this.permission === "Admin") {
    //     this.errorNotSelecting = ""
    //     this.createAdmin();
    //   }
    //   if (this.permission === "ShopKeeper") {
    //     this.errorNotSelecting = ""
    //     this.createShopKeeper();
    //   }
    // }
    const account: IAccount = {
      email: this.email,
      password: this.password,
      PermissionLevel: null,
      userID: "",
      permission: EPermission.CUSTOMER
    }
    this.shopKeeper.onCreateCustomer(account)
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  onCancel() {
    this.shopKeeper.$create_Error.next("");
    this.shopKeeper.$isCreate.next(false);
  }

  displayStyle: any;

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
