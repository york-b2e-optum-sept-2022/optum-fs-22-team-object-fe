import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";
import {AdminService} from "../admin.service";
import {IDelete} from "../interfaces/Accounts/IDelete";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private adminService: AdminService) {
    this.adminService.$currentID.subscribe({
      next: value => {
        console.log(value)
        this.userID = value;
      },error: err => {console.log(err)}
    })
    this.adminService.$current_Email.subscribe({
      next: value => {
        console.log("EMAIL: " + value)
        this.email = value;
      },error: err => {}
    })
  }

  ngOnInit(): void {}
  email: string = "";
  userID: string = "";
  isCart: boolean = false;
  isAccount: boolean = false;


  onLogOut() {
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }
  onCart() {
    this.isAccount = false;
    this.isCart = true;
  }
  onAccount() {
    this.isCart = false;
    this.isAccount = true;
  }
  onDeleteAccount() {
    const account: IDelete = {
      email: this.email,
      userID: this.userID
    }
    this.adminService.deleteAccount(account);
    this.adminService.$permission.next("");
    this.adminService.$isLogged.next(false);
  }







}
