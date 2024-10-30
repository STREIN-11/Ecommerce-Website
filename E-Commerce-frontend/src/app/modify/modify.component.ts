import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ProductSharedService } from '../services/product-shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.css'
})
export class ModifyComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private sharedService: ProductSharedService ) { }
  ngOnInit(): void {
    this.loadProducts();
    if(this.products) {
      console.log(this.products);
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.sharedService.setProducts(products); // Set the products in the shared service
    });
  }

  editProduct(id:number){
    const editedName:string|null = prompt("Enter your new product name")
    let price = prompt("Enter new price")
    if(editedName && price){

      this.productService.editProduct(id,editedName,parseFloat(price)).subscribe(()=>this.loadProducts());
    }
  }
 deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  addProduct():void{
    const name:string|null = prompt("Enter New product name")
    const price:string|null = prompt("Enter price")
    const id = this.products.length + 10;
    if(name && id && price){
      this.productService.addToProduct(id,name,parseFloat(price)).subscribe(()=>this.loadProducts());
    }
  }

}
