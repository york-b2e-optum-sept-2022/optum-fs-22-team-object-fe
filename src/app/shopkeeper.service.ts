import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {

  constructor(private httpService: HttpService) {}

}
