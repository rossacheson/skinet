import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  public basket$ = this.basketSource.asObservable();
  private readonly basketIdKey: string = 'basket_id';

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
      })
    );
  }

  public setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: (response) => {
        this.basketSource.next(response);
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
