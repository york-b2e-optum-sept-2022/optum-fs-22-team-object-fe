import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-main-shop-keeper',
  templateUrl: './main-shop-keeper.component.html',
  styleUrls: ['./main-shop-keeper.component.css']
})
export class MainShopKeeperComponent implements OnInit {

  constructor(private adminService: AdminService, private shopKeeper: ShopkeeperService) {}

  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  viewSwitch!: boolean;

  viewInventory() {
    this.viewSwitch = true;
  }

  viewProduct() {
    this.viewSwitch = false;
  }
}
