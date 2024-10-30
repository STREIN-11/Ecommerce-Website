import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { CartItems, Cart } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5182'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/Product');
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + '/Product', product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + '/Product'}/${id}`);
  }

  updateCartItemQuantity(cartItemID: number,productID: number, quantity: number):Observable<void> {
    return this.http.put<void>(`${this.apiUrl+'/Cart'}/${cartItemID}`, { cartItemID,productID ,quantity});
  }
  
  removeCartItem(productID: number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + '/Cart'}/${productID}`);
  }

  addToCartIntoDB(id: number, price: number, quantity: number, name: string): Observable<CartItems[]> {
    return this.http.post<CartItems[]>(`${this.apiUrl}/Cart?quantity=${quantity}`, {
      productID: id,
      price: price,
      productName: name
    });
  }

  calculateTotalPrice(cartItems: CartItems[]): Observable<number> {
    return this.getProducts().pipe(
      map((products: Product[]) => {
        // Calculate total price
        const totalPrice = cartItems.reduce((sum, cartItem) => {
          const product = products.find(p => p.productID === cartItem.productId);
          return sum + (product ? product.price * cartItem.quantity : 0);
        }, 0);
        return totalPrice;
      })
    );
  }

  getUserCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/Cart`);
  }

  editProduct(productID:number,productName:string,price:number): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/Product/${productID}`,{
      productID: productID,
      productName: productName,
      price: price
    })
  }

  addToProduct(productID:number,productName:string,price:number): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/Product`,{
      productID: productID,
      productName: productName,
      price: price
    })
  }

}
