import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../models/cartitem';
import { ProductSharedService } from '../services/product-shared.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesReportComponent implements OnInit {
  products: Product[] = [];
  cartItems: Cart[] = [];
  totalCartPrice: number = 0;
  highestQuantityProductName: string = '';
  highestQuantityProductQuantity: number = 0;
  totalPriceByProduct: { [productName: string]: number } = {};

  constructor(private productService: ProductService, private sharedService: ProductSharedService) {
    this.products = this.sharedService.getProducts();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.showCart();
    });
  }

  showCart(): void {
    this.productService.getUserCart().subscribe((cartItems: Cart[]) => {
      console.log('Cart Items:', cartItems);
      this.cartItems = cartItems.map(cartItem => {
        const productDetails = this.getProductDetails(cartItem.productID);
        return {
          cartItemID: cartItem.cartItemID,
          productID: cartItem.productID,
          productName: productDetails.name,
          quantity: cartItem.quantity,
          totalPrice: productDetails.price * cartItem.quantity
        };
      });

      this.calculateTotalCartPrice();
      this.calculateHighestQuantityProduct();
      this.calculateTotalPriceByProduct();
    });
  }

  getProductDetails(id: number): { name: string; price: number } {
    const product = this.products.find((p) => p.productID === id);
    if (product) {
      return { name: product.productName, price: product.price };
    } else {
      console.error('Product not found with ID:', id);
      return { name: 'Unknown Product', price: 0 };
    }
  }

  calculateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    console.log('Total Cart Price:', this.totalCartPrice);
  }

  calculateHighestQuantityProduct(): void {
    let maxQuantity = 0;
    this.cartItems.forEach(item => {
      if (item.quantity > maxQuantity) {
        maxQuantity = item.quantity;
        this.highestQuantityProductName = item.productName;
        this.highestQuantityProductQuantity = item.quantity;
      }
    });
  }

  calculateTotalPriceByProduct(): void {
    this.totalPriceByProduct = this.cartItems.reduce((acc, item) => {
      if (!acc[item.productName]) {
        acc[item.productName] = 0;
      }
      acc[item.productName] += item.totalPrice;
      return acc;
    }, {} as { [productName: string]: number });
    console.log('Total Price By Product:', this.totalPriceByProduct);
  }

}
