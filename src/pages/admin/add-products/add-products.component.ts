import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../api/products/products.service';
import { Route, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-products.component.html',
})
export class AddProductsComponent {
  constructor(
    private productService: ProductsService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  previewUrl: string | ArrayBuffer | null = null;
  showPreview = false;
  selectedFile: File | null = null;
  submitted = false;

  adminAddProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    is_featured_product: new FormControl(false),
    is_top_categories: new FormControl(false),
    categories_name: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.submitted = true;

    const formData = new FormData();

    formData.append('name', this.adminAddProductForm.value.name || '');
    formData.append(
      'description',
      this.adminAddProductForm.value.description || ''
    );
    formData.append('price', String(this.adminAddProductForm.value.price || 0));
    formData.append(
      'is_featured_product',
      this.adminAddProductForm.value.is_featured_product ? 'true' : 'false'
    );
    formData.append(
      'is_top_categories',
      this.adminAddProductForm.value.is_top_categories ? 'true' : 'false'
    );
    formData.append(
      'our_productType_categoriesId',
      this.adminAddProductForm.value.categories_name || ''
    );

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.addProducts(formData).subscribe({
      next: (data) => {
        this.toastr.success('Product added successfully');
        this.adminAddProductForm.reset();
        this.previewUrl = null;
        this.showPreview = false;
        this.route.navigate(['/add-products']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
