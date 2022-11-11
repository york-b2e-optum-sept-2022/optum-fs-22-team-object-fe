import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {IProduct} from "./interfaces/IProduct";
import {BehaviorSubject, first, Subject} from "rxjs";
import {ICategory} from "./interfaces/ICategory";
import {ICoupon} from "./interfaces/ICoupon";
import {IProductDelete} from "./interfaces/IProductDelete";
import {AdminService} from "./admin.service";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {
  constructor(private httpService: HttpService) {}
  products = new Subject<IProduct[]>();


  public createProduct(product: IProduct) {
    this.httpService.createProduct(product).pipe(first()).subscribe(
      {
        next: value => {
          this.getAllProducts(product.userID); // Look at this code more. Not very good way.
        },error: err => {console.log(err)}
      }
    )
  }
  public editProduct(product: IProduct) {
    this.httpService.editProduct(product).pipe(first()).subscribe({
      next: value => {
        console.log(value)
        this.getAllProducts(product.userID);
      },error: err => {console.log(err)}});
  }

  public deleteProduct(product: IProductDelete) {
    this.httpService.deleteProduct(product).pipe(first()).subscribe({
      next: value => {
        this.getAllProducts(product.userID);
      },error: err => {console.log(err)}
    })
  }



  public addCoupon(coupon: ICoupon) {
    this.httpService.addCoupon(coupon).subscribe({
      next: value => {console.log(value)}, error: err => {console.log(err)}
    })
  }
  public deleteCoupon(coupon: ICoupon) {
    this.httpService.deleteCoupon(coupon).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}
    })
  }
  public addCategory(categoryLists: ICategory) {
    return this.httpService.addCategory(categoryLists).pipe(first()).subscribe({
      next: value => {this.getAllProducts(categoryLists.userID);
      },error: err => {console.log(err)}});
  }
  public deleteCategory(category: ICategory) {
    this.httpService.deleteCategory(category).pipe(first()).subscribe({
      next: value => {console.log(value)
        this.getAllProducts(category.userID);
        },error: err => {console.log(err)}}
    )
  }
  public getOneProduct(userID: string, productID: string) {
    this.httpService.getOneProduct(userID,productID).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}});
  }
  public getAllProducts(userID: string) {
    this.httpService.getAllProducts(userID).pipe(first()).subscribe({
      next: value => {
        this.products.next(value);
        //console.log(value);
        },error: err => {console.log(err)}});
  }
  //Need to test
  public getAllCategoriesByName(categoryName: string) {
    this.httpService.getAllCategoriesByName(categoryName).pipe(first()).subscribe({
      next: value => {
        console.log(value)},error: err => {console.log(err)}});
  }






  public editMaps() {}
  public editPrices() {}
  public deleteSale() {}
  public deleteMap() {}
  public deletePrice() {}





}
