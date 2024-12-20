import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [];
  @Input() products: Product[] = [];
  filterCategory: string = '';
  displayedColumns: string[] = [
    'name',
    'price',
    'category',
    'inStock',
    'actions',
  ];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.products;
  }

  // Select product by id
  editProduct(productId: number): void {
    this.selectedProduct =
      this.productService.getProductById(productId) || null;
  }

  // Handle the update
  updateProduct(product: Product): void {
    if (product.id) {
      this.productService.updateProduct(product);
      this.loadProducts();
    }
    this.selectedProduct = null;
  }
  deleteProduct(productId: number | null): void {
    if (productId === null || productId === undefined) {
      console.error('Invalid Product ID:', productId);
      return;
    }
    this.productService.deleteProduct(productId);
    this.loadProducts();
  }
}
