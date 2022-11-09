import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {LoginComponent} from "./login/login.component";
import {MainAdminComponent} from "./main-admin/main-admin.component";
import {MainShopKeeperComponent} from "./main-shop-keeper/main-shop-keeper.component";


const routes: Routes = [
  {path: '', redirectTo:'administrator', pathMatch:'full'},
  {path: 'administrator', component: CreateAdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main-admin', component: MainAdminComponent},
  {path: 'main-shopkeeper', component: MainShopKeeperComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
