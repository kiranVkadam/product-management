import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductStore } from '../../store/product.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  isEditMode = false;
  products$!: Observable<Product[]>;

  constructor(
    private fb: FormBuilder, 
    private productStore: ProductStore, 
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      inStock: [false]
    });
  }

  ngOnInit() {
    // Get product ID from the route parameters
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }
  loadProduct() {
    // Subscribe to the products$ observable and find the product by ID
    this.products$ = this.productStore.products$; // Ensure you are getting the latest products$
    
    // Fetch the product by its ID and patch the form with the product data
    this.productStore.products$.pipe(
      tap((products) => {
        const product = products.find(p => p.id === this.productId);
        if (product) {
          this.productForm.patchValue(product); // Patch form with existing product data
        } else {
          // Redirect if product is not found
          this.router.navigate(['/']);
        }
      })
    ).subscribe();
  }


  saveProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditMode && this.productId !== null) {
        // Update the product if in edit mode
        const updatedProduct: Product = { id: this.productId, ...productData };
        this.productStore.updateProduct(updatedProduct);
      } else {
        // Add a new product if not in edit mode
        this.productStore.addProduct(productData);
      }

      // Redirect to the product list after saving
      this.router.navigate(['/']);
    }
  }

  deleteProduct(): void {
    if (this.productId) {
      // Delete the product if the ID exists
      this.productStore.deleteProduct(this.productId);
      // Redirect after deletion
      this.router.navigate(['/']);
    }
  }
}
