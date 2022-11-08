import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {IAccount} from "../interfaces/IAccount";
import {IAccountDisplay} from "../interfaces/IAccountDisplay";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit, OnDestroy{


  constructor(private shopKeeper: ShopkeeperService) {
    this.shopKeeper.$currentID.subscribe({
      next: value => {
        this.shopKeeper.getAllAccounts(value);
      }
    })
    this.shopKeeper.$array.subscribe({
      next: value => {console.log(value)
      this.accounts = value;
      },error: err => {}
    })
  }

  accounts!: IAccount[] | null;

  ngOnInit(): void {
  }

  onLogOut() {
    this.shopKeeper.$permission.next("");
    this.shopKeeper.$isLogged.next(false);
  }
  ngOnDestroy() {
  }

  onDelete(i: number) {
    
  }

  onEdit(i: number) {
    
  }
}
