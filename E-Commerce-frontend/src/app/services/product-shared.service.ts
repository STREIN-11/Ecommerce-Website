import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class ProductSharedService {
  private products: Product[] = [];

  setProducts(products: Product[]): void {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
