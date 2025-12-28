import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dish } from '../../models/dish';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dish-card">
      <!-- Imagem do prato -->
      <div class="dish-image">
        <img [src]="dish.image" [alt]="dish.name" />

        <!-- Badges -->
        <div class="badges">
          <span *ngIf="dish.isVegetarian" class="badge vegetarian">🌱 Veg</span>
          <span *ngIf="dish.isSpicy" class="badge spicy">🌶 Picante</span>
        </div>
      </div>

      <!-- Informações do prato -->
      <div class="dish-info">
        <h3 class="dish-name">{{ dish.name }}</h3>
        <p class="dish-description">{{ dish.description }}</p>

        <div class="dish-details">
          <span class="price">R$ {{ dish.price.toFixed(2) }}</span>

          <div class="dish-meta">
            <span *ngIf="dish.calories" class="calories">
              🔥 {{ dish.calories }} cal
            </span>
            <span *ngIf="dish.preparationTime" class="prep-time">
              ⏱ {{ dish.preparationTime }} min
            </span>
          </div>
        </div>

        <!-- Ingredientes -->
        <div class="ingredients">
          <small>Ingredientes: {{ dish.ingredients.join(', ') }}</small>
        </div>

        <!-- Ações -->
        <div class="actions">
          <button
            class="btn-details"
            [routerLink]="['/dish', dish.id]">
            📖 Ver Detalhes
          </button>

          <button
            class="btn-add"
            (click)="addToCart.emit(dish)">
            ➕ Adicionar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dish-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      height: 100%;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
    }

    .dish-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .dish-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    .dish-card:hover .dish-image img {
      transform: scale(1.05);
    }

    .badges {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 5px;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: bold;
      color: white;

      &.vegetarian {
        background: #4CAF50;
      }

      &.spicy {
        background: #FF5722;
      }
    }

    .dish-info {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .dish-name {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.25rem;
    }

    .dish-description {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      flex: 1;
    }

    .dish-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #d32f2f;
    }

    .dish-meta {
      display: flex;
      gap: 10px;
      font-size: 0.8rem;
      color: #777;
    }

    .ingredients {
      margin-bottom: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .ingredients small {
      color: #888;
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
    }

    .btn-details, .btn-add {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .btn-details {
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;

      &:hover {
        background: #e0e0e0;
      }
    }

    .btn-add {
      background: #d32f2f;
      color: white;

      &:hover {
        background: #b71c1c;
      }
    }

    @media (max-width: 768px) {
      .actions {
        flex-direction: column;
      }

      .dish-image {
        height: 180px;
      }
    }
  `]
})
export class DishCardComponent {
  @Input() dish!: Dish;
  @Output() addToCart = new EventEmitter<Dish>();
}
