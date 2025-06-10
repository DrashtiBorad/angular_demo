import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../api/products/products.service';

interface Product {
  name: string;
  description: string;
}

@Component({
  selector: 'app-addProducts',
  imports: [NgFor],
  templateUrl: './addProducts.component.html',
})
export class AddProductComponent {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data?.['All Products'];
        console.log('Products fetched successfully:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
