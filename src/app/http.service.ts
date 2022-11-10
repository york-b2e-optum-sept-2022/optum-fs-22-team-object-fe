import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";
import {IAdmin} from "./interfaces/IAdmin";
import {IDelete} from "./interfaces/IDelete";
import {IUpdateLocal} from "./interfaces/IUpdateLocal";
import {IProduct} from "./interfaces/IProduct";
import {ICategory} from "./interfaces/ICategory";


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
  public deleteProduct(product: IProduct) {
    const product_Data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userID: product.userID,
        email: product.productID
      }
    }
    return this.httpClient.delete("http://localhost:3000/api/product/create",product_Data);
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

      }
    }
    return this.httpClient.delete("http://localhost:3000/api/product/delete/categories",category_Data);
  }

  public getAllProducts(userID: string): Observable<IProduct[]>{
    return this.httpClient.get(`http://localhost:3000/api/product/get/all?userID=${userID}`) as Observable<IProduct[]>;
  }
}
