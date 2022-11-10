import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {IAccount} from "../interfaces/IAccount";
import {IAccountDisplay} from "../interfaces/IAccountDisplay";
import {IDelete} from "../interfaces/IDelete";

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

  onEdit(i: number) {




  }
  onCreate() {
    this.shopKeeper.$main_Admin_Create.next(true);
  }
  onCancel() {
    this.shopKeeper.$main_Admin_Create.next(false);
  }


}
