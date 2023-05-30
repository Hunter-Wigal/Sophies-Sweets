import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
import { FilesService } from '../files.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class OrderPageComponent {
  validName: boolean;
  validEmail: boolean;

  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("How to Order");
    this.validName = true;
    this.validEmail = true;
  }

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
    const button = document.getElementById("cakeButton");

    if(button){
      button.innerHTML = cake;
    }
  }

  selectIcing(icing: string){
    const button = document.getElementById("icingButton");

    if(button){
      button.innerHTML = icing;
    }
  }

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

}
