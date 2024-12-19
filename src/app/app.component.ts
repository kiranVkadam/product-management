import { Component ,OnInit } from '@angular/core';
import { ProductStore } from './store/product.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-management';
  constructor(private productStore: ProductStore) {}

 
}
