import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
import { Firestore, getFirestore } from '@firebase/firestore';
import { NgForm } from '@angular/forms';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

//@Injectable({ providedIn: 'root' })
export class OrderPageComponent {
  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("How to Order");

  }

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

  selectCake(cake: string){
    const button = document.getElementById("cakebutton");

    if(button){
      button.innerHTML = cake;
    }
  }

  selectIcing(icing: string){
    const button = document.getElementById("icingbutton");

    if(button){
      button.innerHTML = icing;
    }
  }

  async addOrder(orderForm: NgForm){
    let name = orderForm.value.name;
    let email = orderForm.value.email;
    let phoneNumber = orderForm.value.phone;
    let orderType = document.getElementById("typebutton")?.innerHTML;
    let quantity = document.getElementById("quantitybutton")?.innerHTML;
    let cakeFlavor = document.getElementById("cakebutton")?.innerHTML;
    let icingFlavor = document.getElementById("icingbutton")?.innerHTML;
    let comments = document.getElementById("comments")?.innerHTML;

    // Check if the elements are null
    if(orderType == null || quantity == null || cakeFlavor == null || icingFlavor == null || comments == null){
      window.alert("There was an error with processing the order");
      return;
    }

    if(orderType.trim() === "Select" || orderType.trim() === "Select" || orderType.trim() === "Select" || 
    (cakeFlavor.trim() === "Select" && orderType.trim() !== "Macarons")){
      window.alert("Please fill out all required fields before submitting");
      return;
    }

    const order = new OrderModel(name, email, phoneNumber, orderType, parseInt(quantity), cakeFlavor, icingFlavor, comments);
    await this.fs.addOrder(order);

    window.alert("Order processed successfully")
    
    await this.sleep(2000);

    window.location.reload();
  }
}

