import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-main-customer',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private adminService: AdminService) {
    console.log("CUSTOMER PAGE");
  }

  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
}
