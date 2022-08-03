import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  public getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();
    if (brandId) {
      params = params.append('brandId', brandId);
    }
    if (typeId) {
      params = params.append('typeId', typeId);
    }
    return this.http
      .get<IPagination<IProduct>>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(map((response) => response.body!));
  }

  public getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  public getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
