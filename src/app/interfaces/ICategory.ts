import {IProduct} from "./IProduct";

export interface ICategory extends IProduct{
  productIDs: String[],
  categoryName: String,

}
