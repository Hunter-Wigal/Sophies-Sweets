import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
<<<<<<< HEAD
import { Firestore, getFirestore } from '@firebase/firestore';
import { NgForm } from '@angular/forms';
import { FilesService } from '../files.service';
=======
import { FilesService } from '../files.service';
import { NgForm } from '@angular/forms';
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

//@Injectable({ providedIn: 'root' })
export class OrderPageComponent {
<<<<<<< HEAD
  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("How to Order");

=======
  validName: boolean;
  validEmail: boolean;

  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("How to Order");
    this.validName = true;
    this.validEmail = true;
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
  }

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  selectType(type: string){
    const button = document.getElementById("typeButton");

    if(button){
      button.innerHTML = type;
    }
  }

  selectQuantity(quantity: string){
    const button = document.getElementById("quantityButton");

    if(button){
      button.innerHTML = quantity;
    }
  }

  selectCake(cake: string){
<<<<<<< HEAD
    const button = document.getElementById("cakebutton");
=======
    const button = document.getElementById("cakeButton");
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0

    if(button){
      button.innerHTML = cake;
    }
  }

  selectIcing(icing: string){
<<<<<<< HEAD
    const button = document.getElementById("icingbutton");
=======
    const button = document.getElementById("icingButton");
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0

    if(button){
      button.innerHTML = icing;
    }
  }

<<<<<<< HEAD
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
=======
  async addOrder(form: NgForm){
    const typeSelect = document.getElementById("typeButton");
    const quantitySelect = document.getElementById("quantityButton");
    const cakeSelect = document.getElementById("cakeButton");
    const icingSelect = document.getElementById("icingButton");
    const commentsSelect = document.getElementById("comments");

    let type= "";
    let quantity = "";
    let cakeFlavor = "";
    let icing = "";
    let comments = "";

    if(typeSelect && quantitySelect && cakeSelect && icingSelect && commentsSelect){
      type = typeSelect.innerHTML;
      quantity = quantitySelect.innerHTML;
      cakeFlavor = cakeSelect.innerHTML;
      icing = icingSelect.innerHTML;
      comments = commentsSelect.innerHTML;
    }
    else{
      window.alert("Error with form");
      return;
    }

    const name: string = form.value.name;
    const email: string = form.value.email;

    if(!name || name.length < 5){
      this.validName = false;
      return;
    }
    else{
      this.validName = true;
    }

    if(!email || email.search("@") < 1){
      this.validEmail = false;
      return;
    }
    else{
      this.validEmail = true;
    }

    const order = new OrderModel(form.value.name, form.value.email, form.value.phone, type, quantity, cakeFlavor, icing, 
      comments);
    
    const success = await this.fs.addOrder(order);

    if(success != null){
      window.alert("Successfully added order");
      console.log(success);
      // window.location.reload();
      
    }
    else{
      window.alert("Error adding document");
    }
  }

>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
}

