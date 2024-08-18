export interface Product {
  IdProduct?: any;
  Name: string;
  Description: string;
  NutritionalInformation: string;
  Price: number;
  Stock: number;
  file: File;
  Category: string;
  UrlImage?: any;
}

export interface form {
  name: string;
  description: string;
  nutritionalInfo: string;
  category: string;
  price: string;
  stock: string;
  image: File | null;
}

export interface ApiResponse {
  msg: string;
  success: boolean;
}