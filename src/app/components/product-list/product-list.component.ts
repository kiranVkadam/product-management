import { Component } from '@angular/core';
import { ProductStore } from '../../store/product.store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  readonly products$ = this.productStore.products$;

  constructor(private productStore: ProductStore) {}

  deleteProduct(productId: number) {
    this.productStore.deleteProduct(productId);
  }
}
