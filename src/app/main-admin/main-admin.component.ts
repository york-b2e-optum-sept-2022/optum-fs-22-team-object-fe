import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../interfaces/Accounts/IAccount";
import {IDelete} from "../interfaces/Accounts/IDelete";
import {IAdmin} from "../interfaces/Accounts/IAdmin";
import {IUpdateLocal} from "../interfaces/Accounts/IUpdateLocal";
import {AdminService} from "../admin.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit, OnDestroy{
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  constructor(private adminService: AdminService) {
    console.log("ADMIN PAGE");
    this.sub1 = this.adminService.$currentID.subscribe({
      next: value => {
        this.currentID = value;
        this.adminService.getAllAccounts(value); // rethink about this one.
      }
    })
    this.sub2 = this.adminService.$array.subscribe({
      next: value => {
        this.accounts = value;
      },error: err => {}
    })
   this.sub3 = this.adminService.$main_Admin_Create.subscribe({
      next: value => {this.switchCreate = value}
    })
  }

  currentID: string = "";
  accounts!: IAccount[];
  switchCreate!: boolean;
  isEdited: boolean = false;
  edit_Index: number = -1;
  email: string = "";
  password: string = "";






  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  onDelete(i: number) {
    const iDelete: IDelete = {
      email: this.accounts[i].email,
      userID: this.currentID
    }

    this.adminService.deleteAccount(iDelete);

  }
  onUpdate() {
    console.log(this.edit_Index);
    if (this.accounts[this.edit_Index].PermissionLevel === "ADMIN") {
      const account: IAdmin = {
        email: this.email,
        password: this.password,
        userID: this.currentID,
        accountChangeID: this.accounts[this.edit_Index].id
      }
      this.adminService.updateAdminAccount(account);
      this.email = "";
      this.password = "";
      this.isEdited = false;
      return;
    }
    const account: IUpdateLocal = {
      userID: this.accounts[this.edit_Index].id,
      email: this.email,
      password: this.password,
      currentID: this.currentID
    }
    this.adminService.updateLocalAccount(account);
    this.email = "";
    this.password = "";
    this.isEdited = false;
    return;
  }

  onEdit(i: number) {
    this.isEdited = true;
    this.edit_Index = i;
  }

  onCreate() {
    this.adminService.$main_Admin_Create.next(true);
  }
  onCancel() {
    this.adminService.$main_Admin_Create.next(false);
  }


}
