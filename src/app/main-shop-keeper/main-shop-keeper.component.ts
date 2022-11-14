import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IProduct} from "../interfaces/Products/IProduct";
import {IProductDelete} from "../interfaces/Products/IProductDelete";
import {ICategory} from "../interfaces/Products/ICategory";
import {ICoupon} from "../interfaces/Coupons/ICoupon";
import {ICouponReturn} from "../interfaces/Coupons/ICouponReturn";
import {ICouponDelete} from "../interfaces/Coupons/ICouponDelete";

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
    this.shopKeeper.getAllProducts("78b7872d-26e7-4480-8832-400504b3d4fb"); // Change this.
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

  isCoupons: boolean = false;
  coupons_Array: ICouponReturn [] = [];
  current_ViewUser: string = "";
  viewCoupons(i: number) {
    this.isCoupons = true;
    this.couponArray_IDs = [];
    this.couponArray_Names = [];

    this.current_ViewUser = this.products_Array[i].productID;
    console.log(this.products_Array[i].productID);
    this.shopKeeper.getCoupon("2641310b-01f6-4791-8215-5bad20751633", this.products_Array[i].productID).subscribe({
      next: value => {
        this.coupons_Array = value;
        console.log(value)},error: err => {console.log(err)}
    })
  }
  onDeleteCoupons(i: number) {
    const temp_Coupon: ICouponDelete = {
      code: this.coupons_Array[i].code,
      // userID: this.userID,
      userID: "2641310b-01f6-4791-8215-5bad20751633",
      productIDs: [this.current_ViewUser]
    };
    this.shopKeeper.deleteCoupon(temp_Coupon);
    this.coupons_Array = [];
    this.shopKeeper.getCoupon("2641310b-01f6-4791-8215-5bad20751633",this.current_ViewUser).subscribe({
      next: value => {this.coupons_Array = value},error: err => {console.log(err)} //look over this.
    })
  }

    products:IProduct[] = []; //arrays
    products_Array: IProduct[] = []; //display arrays

  ngOnInit(): void {}

  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
    console.log("logout")
  }
  viewSwitch!: boolean;
  isCreate: boolean = false;
  isEdited: boolean = false;

  viewInventory() {
    this.viewSwitch = true;
    this.isCreate = false;
    this.isEdited = false;
    this.isCoupons = false;
  }
  viewProduct() {
    this.viewSwitch = false;
    this.isCreate = false;
    this.isEdited = false;
    this.isCoupons = false;
  }
  isCreated() {
    this.productName = "";
    this.description = "";
    this.defaultMAP = -1;
    this.defaultPrice = -1;
    this.isCreate = true;
    console.log("create");
    this.isCoupons = false;
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
      userID: "78b7872d-26e7-4480-8832-400504b3d4fb",
      discontinued: null,
      categories: [],
      coupons: [],
      q: 0
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
      userID: "78b7872d-26e7-4480-8832-400504b3d4fb",
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
      userID: "78b7872d-26e7-4480-8832-400504b3d4fb",
      discontinued: null,
      categories: [],
      coupons: [],
      q: -1
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
      userID: "78b7872d-26e7-4480-8832-400504b3d4fb",
      productIDs: this.listsOfProductIDs,
      categoryName: this.categoryString
    }
    this.shopKeeper.addCategory(category);

    return;
  }
  if (this.switchDelete === true && this.switchAdd === false) {
    const category: ICategory = {
      userID: "78b7872d-26e7-4480-8832-400504b3d4fb",
      productIDs: this.deleteListsOfProductIDs,
      categoryName: this.categoryString
    }
    console.log(this.categoryString);
    this.shopKeeper.deleteCategory(category);
    return;
    }
  }
  onCouponBoolean: boolean = false;

  couponArray_IDs: string[] = [];
  couponArray_Names: string[] = [];

  code: string = "";
  startDate_Coupon: number = -1;
  endDate_Coupon: number = -1;
  sale!:number;

  onCoupon(i : number){
    this.isCoupons = false;
    this.onCouponBoolean = true;
    if (this.couponArray_IDs.length === 0) {
      this.couponArray_IDs.push(this.products_Array[i].productID);
      this.couponArray_Names.push(this.products_Array[i].productName);
      console.log(this.couponArray_Names);
      return;
    }
    let count = 0;
    while(count < this.couponArray_IDs.length) {
      if (this.couponArray_IDs[count] === this.products_Array[i].productID) {
        console.log("SAME ID FROM COUPON");
        return;
      }
      count++;
    }
    this.couponArray_IDs.push(this.products_Array[i].productID);
    this.couponArray_Names.push(this.products_Array[i].productName);
    console.log(this.couponArray_Names);
  }
  addCoupon() {
    const startingDate = new Date(this.startDate_Coupon).getTime();
    const endingDate = new Date(this.endDate_Coupon).getTime()+1;
    //Date overlab.
    const coupon: ICoupon = {
      code: this.code,
      productIDs: this.couponArray_IDs,
      // startDate: 11262022,
      // endDate: 11302022,
      startDate: startingDate,
      endDate: endingDate,
      sale: this.sale,
      userID: "2641310b-01f6-4791-8215-5bad20751633"
    }
    this.shopKeeper.addCoupon(coupon);
    this.couponArray_IDs = [];
    this.couponArray_Names = [];
    this.onCouponBoolean = false;
  }



}
