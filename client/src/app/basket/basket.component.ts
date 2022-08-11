import { Component, OnInit } from '@angular/core';

import { IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$ = this.basketService.basket$;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  public incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  public decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  public removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
