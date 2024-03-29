import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchInput!: ElementRef;
  public products: IProduct[] = [];
  public productTypes: IProductType[] = [];
  public brands: IBrand[] = [];
  public shopParams = new ShopParams();
  public totalCount: number = 0;
  public readonly sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
    this.getBrands();
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: number): void {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchInput.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  private getBrands() {
    this.shopService.getBrands().subscribe({
      next: (brands) => {
        this.brands = [{ id: 0, name: 'All' }, ...brands];
      },
      error: (error) => console.log(error),
    });
  }

  private getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
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
}
