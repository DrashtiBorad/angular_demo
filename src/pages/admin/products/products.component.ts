import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../api/products/products.service';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
}

@Component({
  selector: 'app-addProducts',
  imports: [NgFor, CommonModule, FormsModule, RouterModule, LoadingComponent],
  templateUrl: './products.component.html',
})
export class AddProductComponent {
  constructor(
    private productService: ProductsService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  products: Product[] = [];
  productsById: Product | null = null;

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data?.Products || [];
        console.log('Products fetched successfully:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  editProduct(productId: string) {
    console.log('Editing product ID:', productId);
    this.route.navigate([`/admin-edit-products/${productId}`]);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.toastr.success('Product deleted successfully');
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }
}
