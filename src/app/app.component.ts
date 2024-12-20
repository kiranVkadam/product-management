import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'product-management';

  constructor(private productService: ProductService , private cdr: ChangeDetectorRef) {}

  // Fetch products from the store on initialization
  ngOnInit(): void {
    this.productService.loadProducts(); 
  }

  // Method to handle form submission
  onFormSubmit(product: Product): void {
    this.productService.addProduct(product);
  }
  

  // Method to toggle stock status
  toggleStock(productId: number): void {
    this.productService.toggleStock(productId);
  }

  // Method to delete product
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }

  // Access the products from the store directly
  get products() {
    return this.productService.products;
  }
}
