import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {IAccount} from "../interfaces/IAccount";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit, OnDestroy{

  constructor(private shopKeeper: ShopkeeperService) {console.log("MAIN ADMIN")}
  accounts: IAccount[] = []!;

  ngOnInit(): void {
  }

  onLogOut() {
    this.shopKeeper.$permission.next("");
    this.shopKeeper.$isLogged.next(false);
  }
  ngOnDestroy() {
  }
}
