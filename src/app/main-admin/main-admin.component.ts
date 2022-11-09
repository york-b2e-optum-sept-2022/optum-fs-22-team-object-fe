import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {IAccount} from "../interfaces/IAccount";
import {IDelete} from "../interfaces/IDelete";
import {IAdmin} from "../interfaces/IAdmin";
import {IUpdateLocal} from "../interfaces/IUpdateLocal";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit, OnDestroy{
  constructor(private shopKeeper: ShopkeeperService) {
    this.shopKeeper.$currentID.subscribe({
      next: value => {
        this.currentID = value;
        this.shopKeeper.getAllAccounts(value);
      }
    })
    this.shopKeeper.$array.subscribe({
      next: value => {
        this.accounts = value;
      },error: err => {}
    })
    this.shopKeeper.$main_Admin_Create.subscribe({
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
    this.shopKeeper.$permission.next("");
    this.shopKeeper.$isLogged.next(false);
  }
  ngOnDestroy() {
  }

  onDelete(i: number) {
    const iDelete: IDelete = {
      email: this.accounts[i].email,
      userID: this.currentID
    }

    this.shopKeeper.deleteAccount(iDelete);

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
      this.shopKeeper.updateAdminAccount(account);
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
    this.shopKeeper.updateLocalAccount(account);
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
    this.shopKeeper.$main_Admin_Create.next(true);
  }
  onCancel() {
    this.shopKeeper.$main_Admin_Create.next(false);
  }
}
