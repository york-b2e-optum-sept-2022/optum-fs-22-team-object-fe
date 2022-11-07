import { Component, OnInit } from '@angular/core';
import {EPermission} from "../enum/EPermission";
import {getLocaleExtraDayPeriodRules} from "@angular/common";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  constructor() {}

  email!: string;
  password!: string;
  permission!: string;

  ngOnInit(): void {}

  onCreate() {
    console.log(this.permission);
  }

  CreateAdmin() {
  asdadadad
  }
  CreateCustomer() {

  }
  CreateShopKeeper() {

  }
}
