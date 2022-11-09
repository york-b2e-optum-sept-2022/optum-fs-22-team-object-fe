import {Component, OnDestroy} from '@angular/core';
import {ShopkeeperService} from "./shopkeeper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  isCreated: boolean = false;

  isLogged: boolean = false;
  isCustomer: boolean = false;
  isAdmin: boolean = false;
  isShopKeeper: boolean = false;


  constructor(private shopKeeper: ShopkeeperService) {
    this.sub1=this.shopKeeper.$isCreate.subscribe({
      next: value => {this.isCreated = value},error: err => {}
    });

    this.sub2 = this.shopKeeper.$isLogged.subscribe({
      next: value => {this.isLogged = value}, error: err => {console.log(err)}
    });

    this.sub3 = this.shopKeeper.$permission.subscribe({
      next: value => {
        if (value === "ADMIN") {
          this.isCustomer = false;
          this.isShopKeeper = false;
          this.isAdmin = true;
          console.log(value);
          return;
        }
        if (value === "CUSTOMER") {
          this.isCustomer = true;
          this.isShopKeeper = false;
          this.isAdmin = false;
          console.log(value);
          return;
        }
        if (value === "SHOPKEEPER") {
          console.log("BOOLEAN: " + this.isShopKeeper)
          this.isShopKeeper = true;
          this.isCustomer = false;
          this.isAdmin = false;
          console.log(value);
          return;
        }
      }, error: err => {
      }
    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}
