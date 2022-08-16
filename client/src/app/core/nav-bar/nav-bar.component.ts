import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$ = this.basketService.basket$;
  currentUser$ = this.accountService.currentUser$;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.accountService.logout();
  }
}
