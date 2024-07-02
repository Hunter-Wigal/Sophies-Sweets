import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from '../order-page/order.model';
import { FilesService } from '../files.service';
import { AuthService } from '../auth.service';
import { HtmlParser } from '@angular/compiler';




@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements AfterViewInit{
  orders: OrderModel[] = [];
  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // @ViewChild('table') table!: HTMLElement;
  table!: HTMLElement | null;

  constructor(private titleService: Title, private fs: FilesService, private as: AuthService) {
    this.titleService.setTitle("Orders");

    this.as.redirect('/admin', false);

    this.getOrders();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.table = document.getElementById('table');
    this.adjustHeight();
  }

  async getOrders(){
    this.orders = await this.fs.getOrders();
    this.cleanOrders();
  }

  adjustHeight(){
    console.log(this.table);
    console.log("loaded");
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
