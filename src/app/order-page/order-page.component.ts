import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
import { NgForm } from '@angular/forms';
import { FilesService } from '../files.service';
import { cakes, cupcakePrices, icing, macaronPrices, macarons, quantities, signatureCakes, signatureMacarons } from './flavors';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

  //@Injectable({ providedIn: 'root' })
  export class OrderPageComponent implements OnInit {
    // TODO add comments for what eac variable does
    validName: boolean;
    validEmail: boolean;
    macaronFlavors: string[];
    validForm: boolean;
    quantities: number[];
    cakeFlavors: string[];
    icings: string[];
    sigCakes: string[];
    sigMacs: string[];
    cupcakePrices: number[];
    macaronPrices: number[];
    macaronSelected: boolean;
    cupCakeSelected: boolean;
    cakeSelected: boolean;
    customCakeSelected: boolean;
    
    templateID: string;
    serviceID: string;
    publicKey: string;

    largeScreen: boolean;

    constructor(private titleService: Title, private fs: FilesService) {
      this.titleService.setTitle("How to Order");
      this.validName = true;
      this.validEmail = true;
      this.macaronSelected = true;
      this.cupCakeSelected = true;
      this.cakeSelected = false;
      this.customCakeSelected = true;


      this.validForm = true;
      this.macaronFlavors = macarons;
      this.quantities = quantities;
      this.cakeFlavors = cakes;
      this.icings = icing;
      this.sigCakes = signatureCakes;
      this.sigMacs = signatureMacarons;
      this.cupcakePrices = cupcakePrices;
      this.macaronPrices = macaronPrices;

      this.templateID = 'template_nzsrmfb';
      this.serviceID = 'service_9mshn9a';
      this.publicKey = 'PK0Vl_xPRIQEajJy0';
      
      this.largeScreen = window.innerWidth > 1000;
      window.onresize = () =>
      {
        this.largeScreen = window.innerWidth > 1000;
      }
    }

    ngOnInit(): void {
      const radio1 = document.getElementById("Radio1");
      const radio2 = document.getElementById("Radio2");
      const signatureForm = document.getElementById("SignatureForm");
      const customForm = document.getElementById("CustomForm");

      if (radio1 && radio2 && signatureForm && customForm) {
        radio1.onclick = function () {
          signatureForm.hidden = false;
          customForm.hidden = true;
        }
        radio2.onclick = function () {
          signatureForm.hidden = true;
          customForm.hidden = false;
        }
      }
      else {
        console.log(radio1);
      }
    }

    sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    select(text: string | number, element: string) {
      const button = document.getElementById(element);
      const type = document.getElementById("type");
      const quantity = document.getElementById("quantity");
      const price = document.getElementById("price");

      if (button) {
        button.innerText = text.toString();
      }

      if (element.includes("typeButton")) {
        if (type) {
          type.innerText = text.toString();
          if (text.toString() === "Cupcakes") {
            this.macaronSelected = false;
            this.cakeSelected = false;
            this.cupCakeSelected = true;
          }
          else if (text.toString() === "Macarons") {
            this.macaronSelected = true;
            this.cakeSelected = false;
            this.cupCakeSelected = false;
            this.customCakeSelected = false;
          }
          else if (text.toString() === "Cake") {
            this.macaronSelected = false;
            this.cakeSelected = true;
            this.cupCakeSelected = false;
          }
        }
      }
      else if (element.includes("quantityButton")) {
        if (quantity) {
          quantity.innerText = text.toString();
        }
      }


      if (type && quantity && type.innerText !== "" && quantity.innerText !== "" && price) {
        if (type.innerText === "Cupcakes") {
          price.innerText = "$" + cupcakePrices[quantities.indexOf(parseInt(quantity.innerText))].toString();
        }
        else if (type.innerText === "Macarons") {
          price.innerText = "$" + macaronPrices[quantities.indexOf(parseInt(quantity.innerText))].toString();
        }
      }
    }

    async addOrder(form: NgForm, formType: number) {
      console.log("Submitting...");
      let typeSelect = document.getElementById("typeButton");
      let quantitySelect = document.getElementById("quantityButton");
      let cakeSelect = document.getElementById("cakeButton");
      let macaronSelect = document.getElementById("macaronButton");
      let icingSelect = document.getElementById("icingButton");
      let commentsSelect = document.getElementById("comments");
      var additionsSelect: HTMLElement | null = null;

      if (formType == 2) {
        typeSelect = document.getElementById("typeButton2");
        quantitySelect = document.getElementById("quantityButton2");
        cakeSelect = document.getElementById("cakeButton2");
        macaronSelect = document.getElementById("macaronButton2");
        icingSelect = document.getElementById("icingButton");
        commentsSelect = document.getElementById("comments2");
        additionsSelect = document.getElementById("additionsButton");
      }

      let type = "";
      let quantity = "";
      let cake = "";
      let icing = "";
      let comments = "";
      let macaron = "";
      let additions = "";

      if (typeSelect && quantitySelect && cakeSelect && commentsSelect && macaronSelect) {
        type = typeSelect.innerText;
        quantity = quantitySelect.innerText;
        cake = cakeSelect.innerText;
        macaron = macaronSelect.innerText;
        comments = commentsSelect.innerText;

        if(icingSelect && additionsSelect){
          icing = icingSelect.innerText;
          additions = additionsSelect.innerText;
        }
      }
      else {
        window.alert("Error with form");
        return;
      }

      if (type.trim() === "Select") {
        window.alert("Please select a type");
        return;
      }
      if (quantity.trim() === "Select") {
        window.alert("Please select a quantity");
        return;
      }
      if (cake.trim() === "Select" && (type.trim() === "Cupcakes" || type.trim() === "Cake")) {
        window.alert("Please select a cake flavor");
        return;
      }
      else if (macaron.trim() === "Select" && type.trim() === "Macarons") {
        window.alert("Please select a macaron flavor");
        return;
      }
      if (additions.trim() !== "Select") {
        comments = additions.concat(", " + comments);
      }
      if (icing.trim() === "Select" && formType == 2) {
        window.alert("Please select an icing flavor");
        return;
      }

      const name: string = form.value.name;
      const email: string = form.value.email;

      if (!name || name.length < 5) {
        window.alert("Please use your full name")
        this.validName = false;
        return;
      }
      else {
        this.validName = true;
      }

      if (!email || email.search("@") < 1) {
        this.validEmail = false;
        window.alert("Please use a valid email")
        return;
      }
      else {
        this.validEmail = true;
      }

      const order = new OrderModel(form.value.name, form.value.email, form.value.phone, type, quantity, cake, macaron, icing,
        comments, form.value.date.toString());

      const success = await this.fs.addOrder(order);

      if (success != null) {
        this.sendEmail(order);
        window.alert("Successfully added order");

        window.location.reload();
      }
      else {
        window.alert("Error adding document");
      }
    }//End of addOrder

    // sendEmail() {
    //   var templateParams = {
    //     from_name: "Hunter",
    //     to_name: "Also Hunter",
    //     message: "This is a test message to see if this service works.",
    //     reply_to: "hunterwigal@gmail.com"
    //   }
    //   emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
    //     .then(function (response) {
    //       console.log('SUCCESS!', response.status, response.text);
    //     }, function (error) {
    //       console.log('FAILED...', error);
    //     });
    // }

    sendEmail(order: OrderModel) {
      var templateParams = {
        name: order.name,
        quantity: order.quantity,
        type: order.type,
        requestedDate: order.requestedDate
      }
      emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });
    }

  }

