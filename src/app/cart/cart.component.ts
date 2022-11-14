import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customer.service";
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private customerService: CustomerService, private productService: ShopkeeperService) { }

  ngOnInit(): void {}

}
