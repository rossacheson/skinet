import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: number;
  product?: IProduct;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    // show as blank until the product is loaded
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(this.productId);
  }

  private loadProduct(id: number): void {
    this.shopService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.breadcrumbService.set('@productDetails', product.name);
      },
      error: (error) => console.log(error),
    });
  }
}
