import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductStore extends ComponentStore<{ products: Product[] }> {
  constructor() {
    super({ products: [] });
    this.addProduct({ name: 'Laptop', price: 1200, category: 'Electronics', inStock: true });
    this.addProduct({ name: 'Smartphone', price: 800, category: 'Electronics', inStock: false });
    this.addProduct({ name: 'Washing Machine', price: 500, category: 'Home Appliances', inStock: true });
    this.addProduct({ name: 'Refrigerator', price: 900, category: 'Home Appliances', inStock: true });
    this.addProduct({ name: 'Microwave Oven', price: 250, category: 'Home Appliances', inStock: false });
  }

  readonly products$ = this.select((state) => state.products);

  readonly addProduct = this.updater((state, product: Omit<Product, 'id'>) => ({
    products: [
      ...state.products,
      {
        id: state.products.length + 1,
        ...product,
      },
    ],
  }));

  readonly updateProduct = this.updater((state, updatedProduct: Product) => ({
    products: state.products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    ),
  }));

  readonly deleteProduct = this.updater((state, productId: number) => ({
    products: state.products.filter((p) => p.id !== productId),
  }));
}
