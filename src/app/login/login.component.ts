import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = "";
  email: string = "";
  loginError: string = "";

  onLogin() {
    this.shopKeeper.loginAccount(this.email, this.password);
  }
  onCreate() {
    this.shopKeeper.$create_Error.next("");
    this.shopKeeper.$isCreate.next(true);
  }

  constructor(private shopKeeper: ShopkeeperService) {
    this.shopKeeper.$create_Error.subscribe({
      next: value => {
        this.loginError = value;
      },error: err => {
        console.log(err);
      }
    });


  }

  ngOnInit(): void {
  }

}
