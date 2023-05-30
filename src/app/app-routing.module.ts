import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
<<<<<<< HEAD
=======
import { OrdersPageComponent } from './orders-page/orders-page.component';
>>>>>>> 38166ff57989cf252fc832777fafc2d946a49696

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'order',
    component: OrderPageComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
<<<<<<< HEAD
=======
  },
  {
    path: 'orders',
    component: OrdersPageComponent
>>>>>>> 38166ff57989cf252fc832777fafc2d946a49696
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
