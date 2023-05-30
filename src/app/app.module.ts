import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
<<<<<<< HEAD
import { OrdersPageComponent } from './orders-page/orders-page.component';
=======
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0

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
<<<<<<< HEAD
    AdminPageComponent,
    OrdersPageComponent
=======
    AdminPageComponent
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule
=======
    FormsModule,
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
