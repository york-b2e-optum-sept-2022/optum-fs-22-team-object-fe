import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IProduct} from "../interfaces/IProduct";

@Component({
  selector: 'app-main-shop-keeper',
  templateUrl: './main-shop-keeper.component.html',
  styleUrls: ['./main-shop-keeper.component.css']
})
export class MainShopKeeperComponent implements OnInit {

  constructor(private adminService: AdminService, private shopKeeper: ShopkeeperService) {
    this.adminService.$currentID.subscribe({
      next: value => {this.userID = value}
    })
    this.shopKeeper.getAllProducts("2641310b-01f6-4791-8215-5bad20751633");
    this.shopKeeper.products.subscribe({
      next: value => {this.products = value}
    })

  }
  products!:IProduct[];

  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  viewSwitch!: boolean;
  isCreate: boolean = false;

  viewInventory() {
    this.viewSwitch = true;
    this.isCreate = false;
  }
  viewProduct() {
    this.viewSwitch = false;
    this.isCreate = false;
  }
  isCreated() {
    this.isCreate = true;
  }

  /*
  Below will be functions to add/edit/delete
   */
  productName: string = "";
  description: string = "";
  images!: string;
  startDate!: number;
  defaultPrice!: number;
  defaultMAP!: number;
  userID!: string;
  images_Array: string[] = [];

  onCreateProduct() {
    if (this.images_Array.length === 0) {
      console.log("TRY AGAIN.");
    }
    const product: IProduct = {
      productName: this.productName,
      description: this.description,
      images: this.images_Array,
      // startDate: this.startDate,
      startDate: 10112022,
      defaultPrice: this.defaultPrice,
      defaultMAP: this.defaultMAP,
      productID: "",
      // userID: this.userID
      userID: "2641310b-01f6-4791-8215-5bad20751633"
    }
    this.shopKeeper.createProduct(product);
  }
  onSubmit() {
    if (this.images != "") {
      this.images_Array.push(this.images);
      console.log(this.images_Array);
      this.images ="";
      return;
    }
    console.log("Please enter your url");
  }









}
