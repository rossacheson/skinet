import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public products: IProduct[] = [];
  public productTypes: IProductType[] = [];
  public brands: IBrand[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
    this.getBrands();
  }

  public onSearch(): void {}
  public onReset(): void {}

  private getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  private getProductTypes() {
    this.shopService.getProductTypes().subscribe({
      next: (types) => {
        this.productTypes = types;
      },
      error: (error) => console.log(error),
    });
  }

  private getBrands() {
    this.shopService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (error) => console.log(error),
    });
  }
}
