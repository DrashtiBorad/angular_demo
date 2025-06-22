import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../api/products/products.service';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../components/loading/loading.component';

interface Product {
  name: string;
  image: string;
  price: string;
  description: string;
}

@Component({
  selector: 'app-addProducts',
  imports: [NgFor, CommonModule, FormsModule, RouterModule, LoadingComponent  ],
  templateUrl: './products.component.html',
})
export class AddProductComponent {
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
