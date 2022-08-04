import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  public getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId);
    }
    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    return this.http
      .get<IPagination<IProduct>>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(map((response) => response.body!));
  }

  public getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  public getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  public getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
