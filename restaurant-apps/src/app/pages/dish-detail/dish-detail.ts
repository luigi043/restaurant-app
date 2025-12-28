import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu';
import { Dish } from '../../models/dish';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-dish-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dish-detail-page">
      <div class="container">
        <button class="back-button" routerLink="/menu">← Voltar ao Menu</button>

        <div *ngIf="loading" class="loading">Carregando...</div>

        <div *ngIf="!loading && dish" class="dish-detail">
          <div class="dish-image">
            <img [src]="dish.image" [alt]="dish.name">
          </div>

          <div class="dish-info">
            <h1>{{ dish.name }}</h1>
            <p class="dish-description">{{ dish.description }}</p>

            <div class="dish-meta">
              <span class="price">R$ {{ dish.price.toFixed(2) }}</span>
              <span *ngIf="dish.calories">🔥 {{ dish.calories }} cal</span>
              <span *ngIf="dish.preparationTime">⏱ {{ dish.preparationTime }} min</span>
            </div>

            <div class="dish-tags">
              <span *ngIf="dish.isVegetarian" class="tag vegetarian">🌱 Vegetariano</span>
              <span *ngIf="dish.isSpicy" class="tag spicy">🌶 Picante</span>
            </div>

            <div class="ingredients-section">
              <h3>Ingredientes:</h3>
              <ul>
                <li *ngFor="let ingredient of dish.ingredients">{{ ingredient }}</li>
              </ul>
            </div>

            <div class="actions">
              <div class="quantity-selector">
                <button (click)="decreaseQuantity()">−</button>
                <span>{{ quantity }}</span>
                <button (click)="increaseQuantity()">+</button>
              </div>

              <button class="add-to-cart-btn" (click)="addToCart()">
                ➕ Adicionar ao Carrinho (R$ {{ (dish.price * quantity).toFixed(2) }})
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && !dish" class="not-found">
          <h2>Prato não encontrado</h2>
          <p>O prato que você está procurando não existe.</p>
          <button routerLink="/menu" class="btn btn-primary">Voltar ao Menu</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dish-detail-page {
      padding: 2rem 0;
    }

    .back-button {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .dish-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .dish-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
    }

    .dish-info h1 {
      margin-top: 0;
      color: #333;
    }

    .dish-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .dish-meta {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #d32f2f;
    }

    .dish-tags {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .tag {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .vegetarian {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .spicy {
      background: #ffebee;
      color: #c62828;
    }

    .ingredients-section h3 {
      margin-bottom: 1rem;
      color: #333;
    }

    .ingredients-section ul {
      list-style: none;
      padding: 0;
      margin-bottom: 2rem;
    }

    .ingredients-section li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      color: #666;
    }

    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity-selector button {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
    }

    .quantity-selector span {
      min-width: 40px;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .add-to-cart-btn {
      flex: 1;
      padding: 1rem;
      background: #d32f2f;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-to-cart-btn:hover {
      background: #b71c1c;
    }

    .loading {
      text-align: center;
      padding: 4rem;
      color: #666;
    }

    .not-found {
      text-align: center;
      padding: 4rem;
    }

    @media (max-width: 768px) {
      .dish-detail {
        grid-template-columns: 1fr;
      }

      .dish-image img {
        height: 300px;
      }

      .actions {
        flex-direction: column;
      }

      .add-to-cart-btn {
        width: 100%;
      }
    }
  `]
})
export class DishDetailComponent implements OnInit {
  dish: Dish | null = null;
  loading = true;
  quantity = 1;
  dishId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dishId = +params['id'];
      this.loadDish();
    });
  }

  loadDish() {
    if (!this.dishId) return;

    this.loading = true;
    this.menuService.getDishById(this.dishId).subscribe({
      next: (dish) => {
        this.dish = dish || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar prato:', error);
        this.loading = false;
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.dish) {
      this.cartService.addToCart(this.dish, this.quantity);
      alert(`${this.dish.name} adicionado ao carrinho!`);
      this.quantity = 1;
    }
  }
}
