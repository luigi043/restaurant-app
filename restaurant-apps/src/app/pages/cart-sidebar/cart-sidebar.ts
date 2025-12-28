import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/dish';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="cart-sidebar" [class.open]="isOpen">
      <div class="cart-header">
        <h3>🛒 Seu Carrinho</h3>
        <button class="close-btn" (click)="closeCart.emit()">×</button>
      </div>

      <div class="cart-content">
        <!-- Mensagem carrinho vazio -->
        <div *ngIf="items.length === 0" class="empty-cart">
          <p>Seu carrinho está vazio</p>
          <button class="btn btn-primary" (click)="closeCart.emit()">
            Continuar Comprando
          </button>
        </div>

        <!-- Lista de itens -->
        <div *ngIf="items.length > 0" class="cart-items">
          <div *ngFor="let item of items" class="cart-item">
            <div class="item-image">
              <img [src]="item.dish.image" [alt]="item.dish.name" />
            </div>

            <div class="item-details">
              <h4>{{ item.dish.name }}</h4>
              <p class="item-price">R$ {{ item.dish.price.toFixed(2) }}</p>

              <div class="item-quantity">
                <button
                  class="qty-btn"
                  (click)="updateQuantity(item.dish.id, item.quantity - 1)">
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button
                  class="qty-btn"
                  (click)="updateQuantity(item.dish.id, item.quantity + 1)">
                  +
                </button>
              </div>
            </div>

            <div class="item-total">
              <p>R$ {{ (item.dish.price * item.quantity).toFixed(2) }}</p>
              <button
                class="remove-btn"
                (click)="removeItem(item.dish.id)">
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Resumo do pedido -->
        <div *ngIf="items.length > 0" class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>R$ {{ getSubtotal().toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Taxa de serviço</span>
            <span>R$ {{ getServiceFee().toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <strong>Total</strong>
            <strong>R$ {{ getTotal().toFixed(2) }}</strong>
          </div>

          <div class="cart-actions">
            <button class="btn btn-secondary" (click)="clearCart()">
              Limpar Carrinho
            </button>
            <button
              class="btn btn-primary"
              routerLink="/checkout"
              (click)="closeCart.emit()">
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div *ngIf="isOpen" class="cart-overlay" (click)="closeCart.emit()"></div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    .cart-sidebar {
      position: fixed;
      top: 0;
      right: -400px;
      width: 100%;
      max-width: 400px;
      height: 100%;
      background: white;
      box-shadow: -5px 0 25px rgba(0,0,0,0.1);
      z-index: 1000;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;

      &.open {
        right: 0;
      }
    }

    .cart-header {
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8f9fa;
    }

    .cart-header h3 {
      margin: 0;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #666;
      line-height: 1;
      padding: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background: #eee;
      }
    }

    .cart-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem 1rem;
    }

    .empty-cart p {
      color: #666;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }

    .cart-items {
      margin-bottom: 2rem;
    }

    .cart-item {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      align-items: center;
    }

    .item-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-details h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      color: #333;
    }

    .item-price {
      margin: 0 0 0.5rem 0;
      color: #d32f2f;
      font-weight: 500;
    }

    .item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;

      &:hover {
        background: #f5f5f5;
      }
    }

    .qty-value {
      min-width: 30px;
      text-align: center;
      font-weight: 500;
    }

    .item-total {
      text-align: right;
    }

    .item-total p {
      margin: 0 0 0.5rem 0;
      font-weight: bold;
      color: #333;
    }

    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #ff4444;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background: #ffebee;
      }
    }

    .cart-summary {
      border-top: 2px solid #eee;
      padding-top: 1.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: #666;
    }

    .summary-row.total {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      color: #333;
      font-size: 1.2rem;
    }

    .cart-actions {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-actions .btn {
      width: 100%;
    }

    @media (max-width: 768px) {
      .cart-sidebar {
        max-width: 100%;
      }

      .cart-item {
        flex-wrap: wrap;
      }
    }
  `]
})
export class CartSidebarComponent {
  @Output() closeCart = new EventEmitter<void>();

  items: CartItem[] = [];
  isOpen = true; // Controlado pelo componente pai

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe(items => {
      this.items = items;
    });
  }

  updateQuantity(dishId: number, quantity: number) {
    this.cartService.updateQuantity(dishId, quantity);
  }

  removeItem(dishId: number) {
    this.cartService.removeFromCart(dishId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.dish.price * item.quantity),
      0
    );
  }

  getServiceFee(): number {
    return this.getSubtotal() * 0.10; // 10% de taxa de serviço
  }

  getTotal(): number {
    return this.getSubtotal() + this.getServiceFee();
  }
}
