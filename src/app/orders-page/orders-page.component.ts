import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from '../order-page/order.model';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  orders: OrderModel[] = [];

  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("Orders");

    this.getOrders();
  }

  async getOrders(){
    this.orders = await this.fs.getOrders();
  }
}
