import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateAdminComponent } from './create-admin/create-admin.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main-customer/main.component';

import { AppRoutingModule } from './app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavigationComponent } from './navigation/navigation.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MainAdminComponent } from './main-admin/main-admin.component';
import { MainShopKeeperComponent } from './main-shop-keeper/main-shop-keeper.component';
import { ShopkeepCustomerAdminCreateComponent } from './shopkeep-customer-admin-create/shopkeep-customer-admin-create.component';
import { EditShopkeeperCustomerAdminComponent } from './edit-shopkeeper-customer-admin/edit-shopkeeper-customer-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAdminComponent,
    NavigationComponent,
    LoginComponent,
    MainComponent,
    MainAdminComponent,
    MainShopKeeperComponent,
    ShopkeepCustomerAdminCreateComponent,
    EditShopkeeperCustomerAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MDBBootstrapModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
