import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAccount} from "./interfaces/Accounts/IAccount";
import {Observable} from "rxjs";
import {IAdmin} from "./interfaces/Accounts/IAdmin";
import {IDelete} from "./interfaces/Accounts/IDelete";
import {IUpdateLocal} from "./interfaces/Accounts/IUpdateLocal";
import {IProduct} from "./interfaces/Products/IProduct";
import {ICategory} from "./interfaces/Products/ICategory";
import {ICoupon} from "./interfaces/Coupons/ICoupon";
import {IProductDelete} from "./interfaces/Products/IProductDelete";
import {ICouponReturn} from "./interfaces/Coupons/ICouponReturn";
import {ICouponDelete} from "./interfaces/Coupons/ICouponDelete";
import {IProductCount} from "./interfaces/Products/IProductCount";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}
  //WORKING
  public createAccount(account: IAccount): Observable<string> {
    return this.httpClient.post("http://localhost:3000/api/user/register", account,{responseType: 'text'}) as Observable<string>;
  }
  public loginAccount(account: IAccount): Observable<string> {
    return this.httpClient.post("http://localhost:3000/api/user/login",account, {responseType: 'text'}) as Observable<string>;
  }
  public getMyPermissionLevel(userID: string): Observable<string> {
    return this.httpClient.get(`http://localhost:3000/api/user/permission?userID=${userID}`, {responseType: 'text'}) as Observable<string>;
  }
  public updateLocalAccount(account: IUpdateLocal ): Observable<string> {
    //Make sure there's the userID that they want to update.
    //Have to write an error that if they can't change their own account.
    //this is updating customer/shopkeeper accounts

    return this.httpClient.put("http://localhost:3000/api/user/update", account, {responseType: 'text'}) as Observable<string>
  }
  public updateAdminAccount(account: IAdmin) {
    //admin can change admin only
    //working as it should
    //this is updating admin's information
    return this.httpClient.put("http://localhost:3000/api/user/update/admin",account, {responseType: 'text'})
  }
  public deleteAccount(account: IDelete){
    //Something new I learned.
    //Source from : https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: account.userID,
        email: account.email
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/user/delete", options);
  }
  public findAccount(userID: string, email: string): Observable<IAccount> {
    //only admin can search accounts.
    return this.httpClient.get(`http://localhost:3000/api/user/find?userID=${userID}&email=${email}`) as Observable<IAccount>;
  }
  public getAllAccounts(userID: string): Observable<IAccount[]> {
    //only admin can see this listing.
    return this.httpClient.get(`http://localhost:3000/api/user/all?userID=${userID}`) as Observable<IAccount[]>;
  }

  //PRODUCT
  public createProduct(product: IProduct){
    return this.httpClient.post("http://localhost:3000/api/product/create",product,{responseType: 'text'});
  }

  //Need to test
  public deleteProduct(product: IProductDelete) {
    const product_Data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: product.userID,
        productID: product.productID
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/product/delete",product_Data);
  }
  public editProduct(product: IProduct) {
    return this.httpClient.put("http://localhost:3000/api/product/edit",product);
  }




  public addCategory(categoryLists: ICategory) {
    return this.httpClient.put("http://localhost:3000/api/product/edit/categories",categoryLists);
  }
  public deleteCategory(category: ICategory) {
    const category_Data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: category.userID,
        productIDs: category.productIDs,
        categoryName: category.categoryName
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/product/delete/categories",category_Data);
  }
  public getAllProducts(userID: string): Observable<IProduct[]>{
    return this.httpClient.get(`http://localhost:3000/api/product/get/all?userID=${userID}`) as Observable<IProduct[]>;
  }
  public addCoupon(coupon: ICoupon) {
    return this.httpClient.post("http://localhost:3000/api/product/create/coupon",coupon, {responseType:'text'});
  }
  public deleteCoupon(coupon: ICouponDelete) {
    const coupon_Data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: coupon.userID,
        code: coupon.code,
        productIDs: coupon.productIDs
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/product/delete/coupon", coupon_Data);
  }
  public getOneProduct(userID: string, productID: string) {
    return this.httpClient.get(`http://localhost:3000/api/product/get?userID=${userID}&productID=${productID}`);
  }
  public getAllCategoriesByName(categoryName: string) {
    return this.httpClient.get(`http://localhost:3000/api/product/get/allCategories?categoryName=${categoryName}`);
  }


  public getCoupon(userID: string, productID: string): Observable<ICouponReturn[] > {
    return this.httpClient.get(`http://localhost:3000/api/product/get/coupons?userID=${userID}&productID=${productID}`) as Observable<ICouponReturn[] >;
  }

  public putCart(cart: IProductCount) {
    return this.httpClient.put("http://localhost:3000/api/user/cart",cart, {responseType:'text'});
  }
}
