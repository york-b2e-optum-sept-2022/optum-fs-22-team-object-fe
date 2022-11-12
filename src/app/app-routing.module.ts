import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {MainComponent} from "./main-customer/main.component";
import {CustomerAccountComponent} from "./customer-account/customer-account.component";
import {CustomerCartComponent} from "./customer-cart/customer-cart.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {path: 'administrator', component: CreateAdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cust', component: MainComponent},
  {path: 'cust-account', component: CustomerAccountComponent},
  {path: 'cart', component: CustomerCartComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
