import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderModel } from './order.model';
import { NgForm } from '@angular/forms';
import { FilesService } from '../files.service';
import {
  cakes,
  cupcakePrices,
  icing,
  macaronPrices,
  macarons,
  quantities,
  signatureCakes,
  signatureMacarons,
} from './flavors';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from 'src/environments/environment';
// import * as $ from 'jquery';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})

//@Injectable({ providedIn: 'root' })
export class OrderPageComponent implements OnInit {
  // TODO add comments for what each variable does
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

  validName: boolean;
  validEmail: boolean;
  validDate: boolean;
  validType: boolean;
  validQuantity: boolean;
  validCakeFlavor: boolean;
  validMacaronFlavor: boolean;
  validPhone: boolean;
  validIcingFlavor: boolean;

  ordersDisabled = false;

  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle('How to Order');
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

    this.templateID = EMAILJS_TEMPLATE_ID;
    this.serviceID = EMAILJS_SERVICE_ID;
    this.publicKey = EMAILJS_PUBLIC_KEY;

    this.validName = true;
    this.validEmail = true;
    this.validDate = true;
    this.validType = true;
    this.validQuantity = true;
    this.validCakeFlavor = true;
    this.validMacaronFlavor = true;
    this.validPhone = true;
    this.validIcingFlavor = true;

    this.largeScreen = window.innerWidth > 1000;
    window.onresize = () => {
      this.largeScreen = window.innerWidth > 1000;
    };
  }

  ngOnInit(): void {
    const radio1 = document.getElementById('Radio1');
    const radio2 = document.getElementById('Radio2');
    const signatureForm = document.getElementById('SignatureForm');
    const customForm = document.getElementById('CustomForm');

    if (radio1 && radio2 && signatureForm && customForm) {
      radio1.onclick = function () {
        signatureForm.hidden = false;
        customForm.hidden = true;
      };
      radio2.onclick = function () {
        signatureForm.hidden = true;
        customForm.hidden = false;
      };
    } else {
      console.log(radio1);
    }
  }

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  select(text: string | number, element: string) {
    const button = document.getElementById(element);
    const type = document.getElementById('type');
    const quantity = document.getElementById('quantity');
    const price = document.getElementById('price');
    this.quantities = quantities;

    if (button) {
      button.innerText = text.toString();
    }

    if (element.includes('typeButton')) {
      if (type) {
        type.innerText = text.toString();
        if (text.toString() === 'Cupcakes') {
          this.macaronSelected = false;
          this.cakeSelected = false;
          this.cupCakeSelected = true;
        } else if (text.toString() === 'Macarons') {
          this.macaronSelected = true;
          this.cakeSelected = false;
          this.cupCakeSelected = false;
          this.customCakeSelected = false;
          this.quantities.shift();
        } else if (text.toString() === 'Cake') {
          this.macaronSelected = false;
          this.cakeSelected = true;
          this.cupCakeSelected = false;
        }
      }
    } else if (element.includes('quantityButton')) {
      if (quantity) {
        quantity.innerText = text.toString();
      }
    }

    if (
      type &&
      quantity &&
      type.innerText !== '' &&
      quantity.innerText !== '' &&
      price
    ) {
      if (type.innerText === 'Cupcakes') {
        price.innerText =
          '$' +
          cupcakePrices[
            quantities.indexOf(parseInt(quantity.innerText))
          ].toString();
      } else if (type.innerText === 'Macarons') {
        price.innerText =
          '$' +
          macaronPrices[
            quantities.indexOf(parseInt(quantity.innerText))
          ].toString();
      }
    }
  } // End of select

  async addOrder(form: NgForm, formType: number) {

    if(this.ordersDisabled){
      window.alert("Sophie is currently unavailable for orders, please check back later!");
      return;
    }

    let typeSelect = document.getElementById('typeButton');
    let quantitySelect = document.getElementById('quantityButton');
    let cakeSelect = document.getElementById('cakeButton');
    let macaronSelect = document.getElementById('macaronButton');
    let icingSelect = document.getElementById('icingButton');
    let commentsSelect = document.getElementById('comments');
    let dateSelect = document.getElementById('dateSelect');
    var additionsSelect: HTMLElement | null = null;
    var valid = true;

    if (formType == 2) {
      typeSelect = document.getElementById('typeButton2');
      quantitySelect = document.getElementById('quantityButton2');
      cakeSelect = document.getElementById('cakeButton2');
      macaronSelect = document.getElementById('macaronButton2');
      icingSelect = document.getElementById('icingButton');
      commentsSelect = document.getElementById('comments2');
      additionsSelect = document.getElementById('additionsButton');
    }

    let type = '';
    let quantity = '';
    let cake = '';
    let icing = '';
    let comments = '';
    let macaron = '';
    let additions = '';
    let date = '';

    if (
      typeSelect &&
      quantitySelect &&
      cakeSelect &&
      commentsSelect &&
      macaronSelect &&
      dateSelect
    ) {
      type = typeSelect.innerText;
      quantity = quantitySelect.innerText;
      cake = cakeSelect.innerText;
      macaron = macaronSelect.innerText;
      comments = commentsSelect.innerText;
      date = form.value.date;

      if (icingSelect && additionsSelect) {
        icing = icingSelect.innerText;
        additions = additionsSelect.innerText;
      }
    } else {
      $('#errorModal').modal('show');
      return;
    }

    if (type.trim() === 'Select') {
      valid = false;
      this.validType = false;
    } else {
      this.validType = true;
    }
    if (quantity.trim() === 'Select') {
      valid = false;
      this.validQuantity = false;
    } else {
      this.validQuantity = true;
    }

    //Invalid cake/macaron flavor
    if (
      cake.trim() === 'Select' &&
      (type.trim() === 'Cupcakes' || type.trim() === 'Cake')
    ) {
      valid = false;
      this.validCakeFlavor = false;
    } else if (macaron.trim() === 'Select' && type.trim() === 'Macarons') {
      valid = false;
      this.validMacaronFlavor = false;
    }
    // Valid cake/macaron flavor
    else if (cake.trim() !== 'Select') {
      this.validCakeFlavor = true;
    } else if (macaron.trim() !== 'Select') {
      this.validMacaronFlavor = true;
    }

    if (additions.trim() !== 'Select') {
      comments = additions.concat(', ' + comments);
    }

    // Icing check
    if (icing.trim() === 'Select' && formType == 2) {
      this.validIcingFlavor = false;
      valid = false;
    } else {
      this.validIcingFlavor = true;
    }

    if (date.trim() === '') {
      valid = false;
      this.validDate = false;
    } else {
      this.validDate = true;
    }

    const name: string = form.value.name;
    const email: string = form.value.email;

    if (!name || name.length < 5) {
      this.validName = false;
      valid = false;
    } else {
      this.validName = true;
    }

    if (!email || email.search('@') < 1) {
      this.validEmail = false;
      valid = false;
    } else {
      this.validEmail = true;
    }

    if (!valid) {
      return;
    }

    const order = new OrderModel(
      form.value.name,
      form.value.email,
      form.value.phone,
      type,
      quantity,
      cake,
      macaron,
      icing,
      comments,
      form.value.date.toString(),
      'Not set yet'
    );

    const success = await this.fs.addOrder(order);

    if (success != null) {
      this.sendEmail(order);

      $('#successModal').modal('show');
    } else {
      $('#errorModal').modal('show');
    }
  } //End of addOrder


  sendEmail(order: OrderModel) {
    var templateParams = {
      name: order.name,
      quantity: order.quantity,
      type: order.type,
      requestedDate: order.requestedDate,
    };

    emailjs
      .send(this.serviceID, this.templateID, templateParams, this.publicKey)
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  }

  openEmail() {
    window.open('mailto:bakergirlsophie@gmail.com?subject=Cake Order');
  }

  reload() {
    window.location.reload();
  }

  closeNotice() {
    let notice = document.getElementById('notice');
    if (notice != null) notice.hidden = true;
  }
}
