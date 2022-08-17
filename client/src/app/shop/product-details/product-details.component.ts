import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: number;
  product?: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    // show as blank until the product is loaded
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(this.productId);
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product!, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
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
