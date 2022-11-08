import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {path: '', redirectTo:'administrator', pathMatch:'full'},
  {path: 'administrator', component: CreateAdminComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
