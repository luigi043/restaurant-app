

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <nav class="navbar">
        <!-- Logo -->
        <a routerLink="/" class="logo">
          <h1>Restaurante Sabor</h1>
        </a>

        <!-- Menu de navegação -->
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/menu" routerLinkActive="active">Menu</a></li>
          <li><a routerLink="/reservas" routerLinkActive="active">Reservas</a></li>
        </ul>

        <!-- Carrinho -->
        <div class="cart-icon" routerLink="/checkout">
          <span class="cart-count">{{ itemCount }}</span>
          🛒
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo h1 {
      color: #d32f2f;
      margin: 0;
      font-size: 1.5rem;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    .nav-links a.active {
      color: #d32f2f;
    }
    .cart-icon {
      position: relative;
      cursor: pointer;
      font-size: 1.5rem;
    }
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #d32f2f;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class HeaderComponent {
  itemCount = 0;

  constructor(private cartService: CartService) {
    // Atualizar contador do carrinho
    this.cartService.getCartItems().subscribe(items => {
      this.itemCount = this.cartService.getItemCount();
    });
  }
}
