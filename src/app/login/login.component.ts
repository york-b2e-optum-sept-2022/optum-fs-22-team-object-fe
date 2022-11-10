import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";

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
    this.adminService.loginAccount(this.email, this.password);
  }
  onCreate() {
    this.adminService.$create_Error.next("");
    this.adminService.$isCreate.next(true);
  }
  constructor(private adminService: AdminService) {
    this.adminService.$create_Error.subscribe({
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
