import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IProduct} from "../interfaces/IProduct";
import {IProductDelete} from "../interfaces/IProductDelete";
import {ICategory} from "../interfaces/ICategory";

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
    this.shopKeeper.getAllProducts("2641310b-01f6-4791-8215-5bad20751633"); // Change this.
    this.shopKeeper.products.subscribe({
      next: value => {
        this.products_Array = []; // to reset current arrays.
        this.products = value
        console.log(value)
        let count = 0;
        for(let i = 0; i < this.products.length; i++) {
          if (this.products[i].discontinued === false) {
            this.products_Array[count] = this.products[i];
            count++;
          }
        }

      }
    })

  }
  products:IProduct[] = []; //arrays
  products_Array: IProduct[] = []; //display arrays

  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  viewSwitch!: boolean;
  isCreate: boolean = false;
  isEdited: boolean = false;

  viewInventory() {
    this.viewSwitch = true;
    this.isCreate = false;
    this.isEdited = false;
  }
  viewProduct() {
    this.viewSwitch = false;
    this.isCreate = false;
    this.isEdited = false;
  }
  isCreated() {
    this.productName = "";
    this.description = "";
    this.defaultMAP = -1;
    this.defaultPrice = -1;
    this.isCreate = true;
  }

  /*
  Below will be functions to add/edit/delete
   */
  productName: string = "";
  description: string = "";
  images!: string;
  startDate!: number;
  defaultPrice: number = -1;
  defaultMAP: number = -1;
  userID!: string;
  images_Array: string[] = [];
  currentProduct!: IProduct;
  isCreateCategory: boolean = false;

  emptyLocalVariables() {
    this.productName = this.currentProduct.productName;
    this.description = this.currentProduct.description;
    this.defaultPrice = this.currentProduct.defaultPrice;
    this.defaultMAP = this.currentProduct.defaultMAP;
  }

  //CreateProducts
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
      // userID: this.userID,
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      discontinued: null,
      categories: []
    }
    this.shopKeeper.createProduct(product);
  }
  onSubmit() { // This function is to submit image urls
    if (this.images != "") {
      this.images_Array.push(this.images);
      console.log(this.images_Array);
      this.images ="";
      return;
    }
    console.log("Please enter your url");
  }
  //-----------------------------
  //Delete products
  onDeleteProduct(i: number) {
    console.log(this.products_Array[i].productID)
    const productDelete: IProductDelete = {
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      productID: this.products_Array[i].productID
    }
    this.shopKeeper.deleteProduct(productDelete);
  }
  //-----------------------------
  onEditProduct(i: number) {
    console.log(this.products_Array[i].productID)
    this.currentProduct = this.products_Array[i];
    this.isEdited = true;
    this.images_Array = this.currentProduct.images;
    this.emptyLocalVariables();
  }

  onEdit() {
    const product: IProduct = {
      productName: this.productName,
      description: this.description,
      images: this.images_Array,
      // startDate: this.startDate,
      startDate: 10112022,
      defaultPrice: this.defaultPrice,
      defaultMAP: this.defaultMAP,
      productID: this.currentProduct.productID,
      // userID: this.userID,
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      discontinued: null,
      categories: []
    }
    this.shopKeeper.editProduct(product);
    this.emptyLocalVariables();
    this.isEdited = false;
  }
  onCancel() {
    this.emptyLocalVariables();
    this.isEdited = false;
  }
  categoryString: string = "";
  displayProduct: string = "";

  displayCategory: string = "";
  listsOfProductIDs: string[] = [];
  listsDisplay_Name: string[] = [];

  deleteListsOfProductIDs: string[] = [];
  deleteListsDisplay_Name: string[] = [];

  onDeleteCategory(i : number) {
    if (this.deleteListsOfProductIDs.length === 0) {
      this.deleteListsOfProductIDs.push(this.products_Array[i].productID);
      this.deleteListsDisplay_Name.push(this.products_Array[i].productName);
      return;
    }
    let count = 0;
    while(count < this.deleteListsOfProductIDs.length) {
      if (this.deleteListsOfProductIDs[count] === this.products_Array[i].productID) {
        console.log("SAME ID");
        return;
      }
      count++;
    }
    this.deleteListsOfProductIDs.push(this.products_Array[i].productID);
    this.deleteListsDisplay_Name.push(this.products_Array[i].productName);
  }


  switchAdd: boolean = false;
  switchDelete: boolean = false;

  onAddCategory(i: number) {
    if (this.listsOfProductIDs.length === 0) {
      this.listsOfProductIDs.push(this.products_Array[i].productID);
      this.listsDisplay_Name.push(this.products_Array[i].productName);
      return;
    }
    let count = 0;
    while(count < this.listsOfProductIDs.length) {
      if (this.listsOfProductIDs[count] === this.products_Array[i].productID) {
        console.log("SAME ID");
        return;
      }
      count++;
    }
    this.listsOfProductIDs.push(this.products_Array[i].productID);
    this.listsDisplay_Name.push(this.products_Array[i].productName);

  }
  deleteCategory() {

    this.switchDelete = true;
    this.switchAdd = false;
    this.displayCategory = this.categoryString;

  }
  createCategory() {
    this.switchAdd = true;
    this.switchDelete = false;
    this.displayCategory = this.categoryString;

  }
  onCancel2() {
    this.isCreateCategory = false;
  }
  onSubmitCategory() {
  if (this.switchAdd === true) {
    const category: ICategory = {
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      productIDs: this.listsOfProductIDs,
      categoryName: this.categoryString
    }
    this.shopKeeper.addCategory(category);
    return;
  }
  if (this.switchDelete === true && this.switchAdd === false) {
    const category: ICategory = {
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      productIDs: this.deleteListsOfProductIDs,
      categoryName: this.categoryString
    }
    console.log(this.categoryString);
    this.shopKeeper.deleteCategory(category);
    return;
  }




  }

}
