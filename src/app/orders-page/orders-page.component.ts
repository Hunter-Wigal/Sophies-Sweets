import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from '../order-page/order.model';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  orders: OrderModel[] = [];

  constructor(private titleService: Title) {
    this.titleService.setTitle("Orders");

    
  }
}
