import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http.get<IPagination<IProduct>>(
      this.baseUrl + 'products?pageSize=15'
    );
  }

  public getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  public getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
