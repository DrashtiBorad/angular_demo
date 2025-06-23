import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../envirenoment';

type AddProductPayload = {
  name: string;
  image: string;
  price: number;
  description: string;
  is_featured_product: boolean;
  is_top_categories: boolean;
  our_productType_categoriesId: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environments.DATA_API_URL}/get-products`);
  }

  addProducts(payload: FormData): Observable<any> {
    return this.http.post(`${environments.DATA_API_URL}/add-products`, payload);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${environments.DATA_API_URL}/get-productById/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environments.DATA_API_URL}/get-categories`);
  }

  updateProduct(id: string, payload: FormData): Observable<AddProductPayload> {
    return this.http.put<AddProductPayload>(
      `${environments.DATA_API_URL}/update-products/${id}`,
      payload
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environments.DATA_API_URL}/delete-products/${id}`);
  }
}
