import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private shopKeeper: ShopkeeperService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.shopKeeper.$permission.next("");
    this.shopKeeper.$isLogged.next(false);
  }
}
