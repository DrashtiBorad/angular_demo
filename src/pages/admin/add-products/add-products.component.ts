import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../api/products/products.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

type categories = {
  id: string;
  categories_name: string;
};
@Component({
  selector: 'app-add-products',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-products.component.html',
})
export class AddProductsComponent {
  constructor(
    private productService: ProductsService,
    private route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  previewUrl: string | ArrayBuffer | null = null;
  showPreview = false;
  selectedFile: File | null = null;
  submitted = false;
  categories: categories[] = [];
  isEditMode = false;
  productId: string | null = null;

  adminAddProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    is_featured_product: new FormControl(false),
    is_top_categories: new FormControl(false),
    categories_name: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (this.router.snapshot.paramMap.get('id')) {
      this.isEditMode = true;
    }

    this.productId = this.router.snapshot.paramMap.get('id');
    this.productService.getCategories().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.categories = data;
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });

    if (this.isEditMode) {
      this.productService.getProductById(this.productId || '').subscribe({
        next: (product) => {
          console.log(
            'Product fetched by ID:',
            product,
            product.our_productType_categoriesId
          );
          this.adminAddProductForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            is_featured_product: product.is_featured_product,
            is_top_categories: product.is_top_categories,
            categories_name: product.our_productType_category.categories_name,
          });

          this.previewUrl = product.image;
        },
        error: (error) => {
          console.error('Error fetching product by ID:', error);
        },
      });
    }
  }

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

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          this.toastr.success('Product updated successfully');
          this.adminAddProductForm.reset();
          this.previewUrl = null;
          this.showPreview = false;
          this.route.navigate(['/add-products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    } else {
      this.productService.addProducts(formData).subscribe({
        next: () => {
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
