import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly baseUrl = environment.apiUrl;
  private readonly basketIdKey: string = 'basket_id';

  private basketSource = new BehaviorSubject<IBasket | null>(null);
  public basket$ = this.basketSource.asObservable();
  private basketTotalsSource = new BehaviorSubject<IBasketTotals | null>(null);
  public basketTotals$ = this.basketTotalsSource.asObservable();
  private shipping = 0;

  constructor(private http: HttpClient) {}

  // this should just be called once on load of the application from app.component.ts
  public initializeBasket(): void {
    const basketId = localStorage.getItem(this.basketIdKey);
    if (basketId) {
      this.getBasket(basketId).subscribe({
        next: () => console.log('Initialized basket with id: ' + basketId),
        error: (error) => console.log(error),
      });
    }
  }

  public getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  public setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: (response) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getCurrentBasketValue() {
    return this.basketSource.value;
  }

  public addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem(this.basketIdKey, basket.id);
    return basket;
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket
      ? basket.items.reduce((a, b) => b.price * b.quantity + a, 0)
      : 0;
    const total = subtotal + shipping;
    this.basketTotalsSource.next({ shipping, total, subtotal });
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
