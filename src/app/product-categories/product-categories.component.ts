import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  constructor(private adminService: AdminService, private shopKeeper: ShopkeeperService) {}

  ngOnInit(): void {}

}
