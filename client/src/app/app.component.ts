import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Skinet';
  public products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IPagination<IProduct>>('https://localhost:5001/api/products').subscribe({
      next: response => {
        console.log(response);
        this.products = response.data;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
