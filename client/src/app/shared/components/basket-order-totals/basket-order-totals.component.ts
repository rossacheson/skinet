import { Component, OnInit } from '@angular/core';

import { BasketService } from '../../../basket/basket.service';

/* This is a simple wrapper of OrderTotals to be used in the basket and checkout contexts.
 * It handles the fetching of the basket totals from the BasketService.
 */
@Component({
  selector: 'app-basket-order-totals',
  templateUrl: './basket-order-totals.component.html',
  styleUrls: ['./basket-order-totals.component.scss'],
})
export class BasketOrderTotalsComponent implements OnInit {
  basketTotals$ = this.basketService.basketTotals$;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}
}
