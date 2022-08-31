import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<IOrder[]> = this.orderService.getOrdersForUser();

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {}
}
