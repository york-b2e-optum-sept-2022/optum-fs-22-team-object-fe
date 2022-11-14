import {Component, OnDestroy, OnInit} from '@angular/core';
import {EPermission} from "../enum/EPermission";
import {ShopkeeperService} from "../shopkeeper.service";
import {Subscription} from "rxjs";
import {IAccount} from "../interfaces/Accounts/IAccount";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})

export class CreateAdminComponent implements OnInit, OnDestroy{

  constructor(private adminService: AdminService) {
    this.sub1 = this.adminService.$create_Error.subscribe({
        next: value => {this.ERROR_FROM_HTTP_REQUEST = value},error: err => {}
      }
    );
    this.adminService.$permission.subscribe({
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
  ERROR_FROM_HTTP_REQUEST: string = "";
  ngOnInit(): void {}

  onCreate() {
    const account: IAccount = {
      email: this.email,
      password: this.password,
      PermissionLevel: null,
      userID: "",
      permission: EPermission.CUSTOMER,
      id: ""
    }
    this.adminService.onCreateCustomer(account)
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  onCancel() {
    this.adminService.$create_Error.next("");
    this.adminService.$isCreate.next(false);
  }
  displayStyle: any;
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
