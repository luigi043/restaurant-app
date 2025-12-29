import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./components/pages/menu/menu').then(m => m.MenuComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/pages/cart/cart').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/pages/checkout/checkout').then(m => m.CheckoutComponent)
  },
  {
    path: 'reservation',
    loadComponent: () => import('./components/pages/reservation/reservation').then(m => m.ReservationComponent)
  },
  {
    path: 'dish/:id',
    loadComponent: () => import('./components/pages/dish-detail/dish-detail').then(m => m.DishDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
