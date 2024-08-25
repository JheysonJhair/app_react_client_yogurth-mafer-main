export interface SalePayment {
  IdSales: number;
  ShippingMethod: boolean;
  PaymentMethod: boolean;
  PaymentNumber: string;
  CardNumber: string;
  Process: boolean;
  SaleDate: string;
  Total: number;
  idShipment: number;
  ImagePayment: string;
  Client:any;
}
