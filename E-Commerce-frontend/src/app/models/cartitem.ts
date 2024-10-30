export interface CartItems {
  productId: number;
  price: number;
  quantity: number;
}

export interface Cart {
  cartItemID: number;
  productID: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

export type Item = {
  cartItemID: number;
  productID: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}