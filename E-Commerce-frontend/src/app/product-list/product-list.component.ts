import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CartItems } from '../models/cartitem'; // Use CartItem (singular) assuming it's defined correctly
import { ProductSharedService } from '../services/product-shared.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItems: CartItems[] = []; // Corrected 'CartItems' to 'CartItem'
  quantity: { id: number; quantity: number }[] = [];

  

  constructor(private productService: ProductService, private sharedService: ProductSharedService) { }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.sharedService.setProducts(products); // Set the products in the shared service
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
  quantitySetter(id: number): void {
    // Check if the item with the given id already exists in the array
    const existingItem = this.quantity.find(item => item.id === id);

    if (existingItem) {
      // If the item exists, update its quantity
      existingItem.quantity += 1; // Initialize quantity to 0 or set it as needed
    } else {
      // If the item does not exist, push a new object into the array
      this.quantity.push({ id: id, quantity: 2 }); // Initialize quantity to 0
    }
    alert(`One more item added to the cart`);

    console.log(this.quantity); // Log the updated quantity array
  }

  addToCart(id: number, price: number, name: string): void {

    // Find the item in the quantity array by its id
    const quantityItem = this.quantity.find(item => item.id === id);

    // Get the quantity, default to 0 if not found
    const itemQuantity = quantityItem ? quantityItem.quantity : 1;

    // Check if the item is already in the cart
    const existingCartItem = this.cartItems.find(item => item.productId === id);

    if (existingCartItem) {
      // Update quantity if the item already exists in the cart
      existingCartItem.quantity = itemQuantity;
    } else {
      // Add new item to the cart
      this.cartItems.push({
        productId: id,
        price: price,
        quantity: itemQuantity,
      });
      alert('Item added to cart');
    }

    // Log the details for debugging
    console.log(id, price, name, itemQuantity);
    console.log(this.cartItems);

    // Call the service method to add the item to the database
    this.productService.addToCartIntoDB(id, price, itemQuantity, name).subscribe(data => console.log(data));

  }



}

