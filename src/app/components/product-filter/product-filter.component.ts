// src/app/components/product-filter/product-filter.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  @Input() products: Product[] = [];
  @Output() filteredProducts = new EventEmitter<Product[]>();

  selectedCategory: string = '';
  inStock: boolean = false;
  priceRange: number = 500; // Default maximum price

  categories: string[] = ['Electronics', 'Clothing', 'Books']; // Example categories
  onFilterChange() {
    let filtered = this.products;

    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    if (this.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    if (this.priceRange) {
      filtered = filtered.filter(product => product.price <= this.priceRange);
    }

    this.filteredProducts.emit(filtered); // Emit filtered products to parent component
  }
}

