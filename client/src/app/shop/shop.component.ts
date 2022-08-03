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
  public typeIdSelected: number = 0;
  public brandIdSelected: number = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
    this.getBrands();
  }

  public onSearch(): void {}
  public onReset(): void {}

  public onBrandSelected(brandId: number): void {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  public onTypeSelected(typeId: number): void {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  private getProducts() {
    this.shopService
      .getProducts(this.brandIdSelected, this.typeIdSelected)
      .subscribe({
        next: (response) => {
          this.products = response.data;
        },
        error: (error) => console.log(error),
      });
  }

  private getProductTypes() {
    this.shopService.getProductTypes().subscribe({
      next: (types) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...types];
      },
      error: (error) => console.log(error),
    });
  }

  private getBrands() {
    this.shopService.getBrands().subscribe({
      next: (brands) => {
        this.brands = [{ id: 0, name: 'All' }, ...brands];
      },
      error: (error) => console.log(error),
    });
  }
}
