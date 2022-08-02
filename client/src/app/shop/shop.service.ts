import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http.get<IPagination<IProduct>>(
      this.baseUrl + 'products?pageSize=15'
    );
  }
}
