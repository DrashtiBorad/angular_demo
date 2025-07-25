import { Component } from '@angular/core';
import { UsersService } from '../../api/user/users.service';
import { ProductsService } from '../../api/products/products.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
}
@Component({
  selector: 'app-products',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];

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
}
