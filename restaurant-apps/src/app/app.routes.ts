import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Restaurante Sabor - Home'
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'Menu Completo'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Finalizar Pedido'
  },
  {
    path: 'dish/:id',
    loadComponent: () => import('./pages/dish-detail/dish-detail.component').then(m => m.DishDetailComponent),
    title: 'Detalhes do Prato'
  },
  {
    path: 'reservas',
    loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent),
    title: 'Reservar Mesa'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
