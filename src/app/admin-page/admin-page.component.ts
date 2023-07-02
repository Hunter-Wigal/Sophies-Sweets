import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent {
  email = "";
  password = "";
  loggedIn: boolean;

  constructor(private as: AuthService, private titleService: Title, private router: Router){
    this.titleService.setTitle("Admin");
    this.loggedIn = false;

    this.as.redirect('/orders', true);
  }

  // TODO: Add some more verification steps to require a valid email. Also display a message to the user if not valid
  async login(form: NgForm){
    if((<string>form.value.email).search("@") < 1){
      window.alert("Please input a valid email");
      return;
    }
    if(form.value.password == null){
      window.alert("Please input a valid password");
      return;
    }
    const loggedIn = await this.as.login(form.value.email, form.value.password);

    if(loggedIn == null){
      window.alert("You are not an authorized admin for this page");
    }
    else{
      window.alert("Successfully logged in");
      this.router.navigate(['/orders']);
    }

    

  }
}
