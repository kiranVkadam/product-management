import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Create a signal to hold the products array
  private productsSignal = signal<Product[]>([]);

  constructor() {}

  // Get the current value of products from the signal
  get products() {
    return this.productsSignal();
  }

  // Load initial products
  loadProducts(): void {
    const initialProducts: Product[] = [
      { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', inStock: true },
      { id: 2, name: 'Shirt', price: 20, category: 'Clothing', inStock: false },
    ];
    this.productsSignal.set(initialProducts); // Set the initial value of the products signal
  }

 
  addProduct(newProduct: Product): void {
    newProduct.id = Math.floor(Math.random() * 10000); // Simple random ID
    const updatedProducts = [...this.productsSignal(), newProduct];
    this.productsSignal.set(updatedProducts);
    console.log('Product Added:', newProduct);
  }
  
  
  updateProduct(updatedProduct: Product) {
    const currentProducts = this.productsSignal();
    const updatedProducts = currentProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.productsSignal.set(updatedProducts);
  }

  // Delete a product by ID
  deleteProduct(productId: number): void {
    if (typeof productId !== 'number') {
      return;
    }
  
    const currentProducts = this.productsSignal();
    const updatedProducts = currentProducts.filter(product => product.id !== productId);
    this.productsSignal.set(updatedProducts);
  }
  

  // Toggle the inStock status of a product
  toggleStock(productId: number) {
    const currentProducts = this.productsSignal();
    const updatedProducts = currentProducts.map((product) =>
      product.id === productId ? { ...product, inStock: !product.inStock } : product
    );
    this.productsSignal.set(updatedProducts); // Set the updated list with toggled stock
  }
  getProductById(productId: number): Product | undefined {
    return this.productsSignal().find(product => product.id === productId);
  }
}
