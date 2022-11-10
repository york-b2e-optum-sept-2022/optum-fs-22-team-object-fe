import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {IProduct} from "./interfaces/IProduct";
import {first} from "rxjs";
import {ICategory} from "./interfaces/ICategory";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {
  constructor(private httpService: HttpService) {}

  public createProduct(product: IProduct) {
    this.httpService.createProduct(product).pipe(first()).subscribe(
      {
        next: value => {console.log(value)},error: err => {console.log(err)}
      }
    )
  }

  //Need to test
  public deleteProduct(product: IProduct) {
    this.httpService.deleteProduct(product).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}
    })
  }
  public deleteCoupon() {

  }
  public editProduct(product: IProduct) {
    this.httpService.editProduct(product).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}});
  }



  public addCategory(categoryLists: ICategory) {
    return this.httpService.addCategory(categoryLists).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}});
  }
  public deleteCategory(category: ICategory) {
    this.httpService.deleteCategory(category).pipe(first()).subscribe({
      next: value => {console.log(value)},error: err => {console.log(err)}}
    )
  }

}
