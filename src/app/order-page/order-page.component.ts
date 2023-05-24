import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
//import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class OrderPageComponent {
  constructor(private titleService: Title/*, private db: AngularFirestore*/) {
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

  // addOrder(order: OrderModel){
  //   return this.db.collection(id.toString()).doc("UserStored").collection("Assignments").doc(newId).set(
  //     { assignmentName: assignment.assignmentName, dateDue: assignment.dateDue, id: newId });
  // }
}
