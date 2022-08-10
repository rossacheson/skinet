import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Skinet';

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.initializeBasket();
  }
}
