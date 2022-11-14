export interface ICoupon {
  code: string;
  productIDs: string[];
  startDate: number;
  endDate: number;
  sale: number;
  userID: string
}
