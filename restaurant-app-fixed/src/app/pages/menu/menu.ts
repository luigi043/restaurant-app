import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu';
import { Dish } from '../../models/dish';
import { DishCardComponent } from "../../components/dish-card/dish-card";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DishCardComponent],
  template: `
    <div class="menu-page">
      <!-- Filtros -->
      <div class="filters">
        <div class="filter-group">
          <h3>Categorias</h3>
          <button
            *ngFor="let category of categories"
            [class.active]="selectedCategory === category.value"
            (click)="filterByCategory(category.value)">
            {{ category.label }}
          </button>
        </div>

        <div class="filter-group">
          <h3>Filtros</h3>
          <label>
            <input type="checkbox" [(ngModel)]="filters.vegetarian" (change)="applyFilters()">
            Apenas Vegetariano
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="filters.spicy" (change)="applyFilters()">
            Apenas Picante
          </label>
        </div>

        <div class="filter-group">
          <h3>Faixa de Preço</h3>
          <input type="range" min="0" max="200" [(ngModel)]="filters.maxPrice" (input)="applyFilters()">
          <span>Até R$ {{ filters.maxPrice }}</span>
        </div>
      </div>

      <!-- Lista de pratos -->
      <div class="dishes-grid">
        <!-- Skeleton loader durante carregamento -->
        <div *ngIf="loading" class="skeleton-grid">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="skeleton-card"></div>
        </div>

        <!-- Lista de pratos -->
        <app-dish-card
          *ngFor="let dish of filteredDishes"
          [dish]="dish"
          (addToCart)="onAddToCart($event)">
        </app-dish-card>

        <!-- Mensagem se não houver resultados -->
        <div *ngIf="!loading && filteredDishes.length === 0" class="no-results">
          <p>Nenhum prato encontrado com os filtros selecionados.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu-page {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .filters {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    .filter-group h3 {
      margin-top: 0;
      color: #333;
    }
    .filter-group button {
      display: block;
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .filter-group button.active {
      background: #d32f2f;
      color: white;
      border-color: #d32f2f;
    }
    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
    .dishes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    .skeleton-card {
      background: #f0f0f0;
      border-radius: 10px;
      height: 300px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      color: #666;
    }
  `]
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  loading = true;

  // Categorias disponíveis
  categories = [
    { value: 'entrada', label: 'Entradas' },
    { value: 'principal', label: 'Pratos Principais' },
    { value: 'sobremesa', label: 'Sobremesas' },
    { value: 'bebida', label: 'Bebidas' }
  ];

  // Filtros atuais
  selectedCategory: string | null = null;
  filters = {
    vegetarian: false,
    spicy: false,
    maxPrice: 200
  };

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.loadDishes();
  }

  // Carregar todos os pratos
  loadDishes() {
    this.loading = true;
    this.menuService.getDishes().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pratos:', error);
        this.loading = false;
      }
    });
  }

  // Filtrar por categoria
  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Aplicar todos os filtros
  applyFilters() {
    let filtered = [...this.dishes];

    // Filtrar por categoria
    if (this.selectedCategory) {
      filtered = filtered.filter(d => d.category === this.selectedCategory);
    }

    // Filtrar por vegetariano
    if (this.filters.vegetarian) {
      filtered = filtered.filter(d => d.isVegetarian);
    }

    // Filtrar por picante
    if (this.filters.spicy) {
      filtered = filtered.filter(d => d.isSpicy);
    }

    // Filtrar por preço
    filtered = filtered.filter(d => d.price <= this.filters.maxPrice);

    this.filteredDishes = filtered;
  }

  // Adicionar ao carrinho
  onAddToCart(dish: Dish) {
    // Implementar lógica para adicionar ao carrinho
    console.log('Adicionar ao carrinho:', dish);
  }
}
