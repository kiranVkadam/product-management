import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../app/models/product.model';  // Adjust the import if needed

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!category) return products;  // Return all products if no category is selected
    return products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
  }
}

