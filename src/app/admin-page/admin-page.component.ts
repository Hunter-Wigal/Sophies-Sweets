import { Component } from '@angular/core';
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

}
