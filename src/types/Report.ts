export interface CountResponse {
  msg: string;
  count: {
    numerUser: string;
    numberProducts: string;
    numberProductsSold: string;
    result: (string | number)[];
  };
  success: boolean;
}

export interface PaymentCounts {
  numerUser: number;
  numberProducts: number;
  numberProductsSold: number;
  result: number[];
}

export interface DateRange {
  StartDate: string;  
  EndDate: string;    
}

export interface Sale {
  IdSales: number;
  FirstName: string;
  LastName: string;
  ShippingMethod: number;
  PaymentMethod: number;
  Total: number;
  ImagePayment: string;
  SaleDate: string;  
  Process: number;
}

export interface SalesResponse {
  msg: string;
  data: Sale[];
  success: boolean;
}
