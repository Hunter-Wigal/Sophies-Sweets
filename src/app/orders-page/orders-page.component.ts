import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from '../order-page/order.model';
import { FilesService } from '../files.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  orders: OrderModel[] = [];
  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  constructor(private titleService: Title, private fs: FilesService, private as: AuthService) {
    this.titleService.setTitle("Orders");

    this.as.redirect('/admin', false);

    this.getOrders();
  }

  async getOrders(){
    this.orders = await this.fs.getOrders();
    this.cleanOrders();
  }

  async logout(){
    await this.as.logout();
    //window.alert("Signed out");
    this.as.redirect('/admin', false);
  }

  cleanOrders(){
    this.orders.forEach(order =>
      {
        let item: keyof typeof order;
        for(item in order){
          if(order[item].trim() === "Select"){
            order[item] = "";
          }
          else if(order[item].trim().charAt(0) === ","){
            order[item] = order[item].substring(1, order[item].length)
          }
        }
      })
  }

  async deleteOrder(id: string) {
    if(window.confirm("Are you sure you want to delete this order?"))
      await this.fs.deleteOrder(id);
    else
      return

    this.getOrders();
  }
}
