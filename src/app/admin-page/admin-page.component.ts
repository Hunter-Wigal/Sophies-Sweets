import { Component } from '@angular/core';
<<<<<<< HEAD
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
=======
<<<<<<< HEAD
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
=======
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
>>>>>>> 38166ff57989cf252fc832777fafc2d946a49696

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
<<<<<<< HEAD


export class AdminPageComponent {
  constructor(private as: AuthService, private titleService: Title, private router: Router,){
    this.titleService.setTitle("Admin");
  }

  login(form: NgForm){
    const loggedIn = this.as.login(form.value.email, form.value.password);
    if(loggedIn == null){
      window.alert("You are not an authorized admin for this page");
    }
    else{
      window.alert("Successfully logged in");
      this.router.navigate(['/orders']);
    }

  }
=======
export class AdminPageComponent {
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0

  constructor(private titleService: Title) {
    this.titleService.setTitle("Admin Page");
  }

  async logIn(form: NgForm){

  }
}
