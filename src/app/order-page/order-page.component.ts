import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("How to Order");
  }

  selectType(type: string){
    const button = document.getElementById("typebutton");

    if(button){
      button.innerHTML = type;
    }
  }

  selectQuantity(quantity: string){
    const button = document.getElementById("quantitybutton");

    if(button){
      button.innerHTML = quantity;
    }
  }
}
