import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  @Output() productSaved = new EventEmitter<Product>();
  @Input() productToEdit: Product | null = null; 
  @Output() productDeleted = new EventEmitter<number>();
  @Output() formSubmitted = new EventEmitter<Product>();

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      inStock: [false],
    });
  }

  ngOnChanges(): void {
    if (this.productToEdit) {
      this.productForm.patchValue(this.productToEdit);
    }
  }
  saveProduct(): void {
    if (this.productForm.invalid) {
      return; 
    }
    const product: Product = this.productForm.value;
    if (product.id) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.productSaved.emit(product);
    this.productForm.reset();
  }

  loadProduct(product: Product): void {
    this.productForm.patchValue(product);
  }
  deleteProduct(): void {
    if (this.productToEdit?.id) {
      this.productService.deleteProduct(this.productToEdit.id); 
      this.productDeleted.emit(this.productToEdit.id); 
      this.productForm.reset(); 
    }
  }
}
