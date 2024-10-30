import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Cart, CartItems, Item } from '../models/cartitem';
import { ProductSharedService } from '../services/product-shared.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartitemlist.component.html',
  styleUrls: ['./cartitemlist.component.css']
})
export class CartitemlistComponent implements OnInit {
  products: Product[] = [];
  cartItems: Cart[] = [];
  totalCartPrice: number = 0;

  constructor(private productService: ProductService, private sharedService: ProductSharedService) {
    this.products = this.sharedService.getProducts();
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

  ngOnInit(): void {
    this.loadProducts(); // Load products first
    // this.showCart();     // Then show the cart
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;  // Ensure products are loaded
      this.showCart();          // Call showCart() after products are loaded
    });
  }

  showCart(): void {
    this.productService.getUserCart().subscribe((cartItems: Cart[]) => {
      console.log('Cart Items:', cartItems); // Log cart items
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
      // this.applyDiscount();  // Apply discount after calculating total price
    });
  }
  // calculateTotalCartPrice(): void {
  //   // Sum up all totalPrice values in cartItems
  //   this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  //   console.log('Total Cart Price:', this.totalCartPrice); // Log the total price
  // }

  applyDiscount(): void {
    this.cartItems.forEach(item => {
      if (item.quantity > 10) {
        item.totalPrice = item.totalPrice * 0.6; // Apply 40% discount
        alert(`40% discount applied to ${item.productName}`);
      }
    });
    console.log(this.cartItems); // Log the cart items with discounts applied
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }
  removeItem(item: Item): void {
    // Check if item quantity is greater than 1 to decrease it
    if (item.quantity > 1) {
      item.quantity -= 1; // Decrease the quantity by 1

      // Call the API to update the item quantity
      this.productService.updateCartItemQuantity(item.cartItemID, item.productID, item.quantity).subscribe({
        next: () => {
          this.calculateTotalCartPrice(); // Recalculate total cart price after update
          console.log(`Quantity updated successfully for product ID ${item.productID}.`);
        },
        error: (error) => {
          console.error('Failed to update cart item quantity:', error);
        }
      });

    } else if (item.quantity === 1) {
      // When quantity is 1, keep it the same and do not delete the item
      this.productService.updateCartItemQuantity(item.cartItemID, item.productID, item.quantity).subscribe({
        next: () => {
          this.calculateTotalCartPrice(); // Ensure the total cart price is updated
          console.log(`Quantity is 1 for product ID ${item.productID}. Not deleting from backend.`);
        },
        error: (error) => {
          console.error('Failed to update cart item quantity:', error);
        }
      });
    }
  }


  calculateTotalCartPrice(): void {
    // Sum up all totalPrice values in cartItems
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    this.cartItems.forEach(item => {
      item.totalPrice = item.totalPrice * 0.6; // Apply 40% discount

    });
    console.log('Total Cart Price:', this.totalCartPrice); // Log the total price
  }

}

