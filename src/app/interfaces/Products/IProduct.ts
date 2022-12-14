export interface IProduct {
  productName: string;
  description: string;
  images: string[];
  startDate: number;
  defaultPrice: number;
  defaultMAP: number;
  productID: string;
  userID: string;
  discontinued: boolean | null;
  categories: string[];
  coupons: string[];
  q: number;
}
