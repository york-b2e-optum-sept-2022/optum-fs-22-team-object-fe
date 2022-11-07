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

  isCreated: boolean = false;
  isLogged: boolean = false;

  constructor(private shopKeeper: ShopkeeperService) {
    this.sub1=this.shopKeeper.$isCreate.subscribe({
      next: value => {this.isCreated = value},error: err => {}
    });
    this.sub2 = this.shopKeeper.$isLogged.subscribe({
      next: value => {this.isLogged = value}, error: err => {console.log(err)}
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
