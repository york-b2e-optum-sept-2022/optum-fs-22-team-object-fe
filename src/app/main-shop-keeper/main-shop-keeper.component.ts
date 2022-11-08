import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-main-shop-keeper',
  templateUrl: './main-shop-keeper.component.html',
  styleUrls: ['./main-shop-keeper.component.css']
})
export class MainShopKeeperComponent implements OnInit {

  constructor(private shopKeeper: ShopkeeperService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.shopKeeper.$permission.next("");
    this.shopKeeper.$isLogged.next(false);
  }
}
