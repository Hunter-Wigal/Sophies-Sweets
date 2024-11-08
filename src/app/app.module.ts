import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import { MatRadioModule } from '@angular/material/radio';
// import { MatRadioButton } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { GalleryCardComponent } from './gallery/gallery-card/gallery-card.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { ReviewCardComponent } from './home/review-card/review-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OrderPageComponent,
    MenuComponent,
    GalleryComponent,
    AboutPageComponent,
    BottomBarComponent,
    GalleryCardComponent,
    AdminPageComponent,
    OrdersPageComponent,
    ReviewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
