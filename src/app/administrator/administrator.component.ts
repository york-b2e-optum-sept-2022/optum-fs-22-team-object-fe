import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../shopkeeper.service";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  //email, username,

  constructor(private shopKeeper: ShopkeeperService) {}
  onCreate() {

  }
  onLogin() {

  }
  onDelete() {

  }
  onEdit() {
    //edit button will bring user to see all the other administrator users.
  }

  ngOnInit(): void {}

}
