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
}
