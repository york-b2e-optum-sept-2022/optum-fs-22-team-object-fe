import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-shopkeep-customer-admin-create',
  templateUrl: './shopkeep-customer-admin-create.component.html',
  styleUrls: ['./shopkeep-customer-admin-create.component.css']
})
export class ShopkeepCustomerAdminCreateComponent implements OnInit {
  permission: string = "";
  email: string = "";
  password: string = "";

  constructor(private shopKeeper: ShopkeeperService) { }

  ngOnInit(): void {
  }

  onCreate() {

  }

}
