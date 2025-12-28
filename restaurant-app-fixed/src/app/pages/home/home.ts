import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DishCardComponent } from '../../components/dish-card/dish-card';
import { MenuService } from '../../services/menu';
import { Dish } from '../../models/dish';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, DishCardComponent],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Sabor que Encanta</h1>
          <p class="hero-subtitle">Experiência gastronômica única com ingredientes frescos e receitas exclusivas</p>
          <div class="hero-buttons">
            <a routerLink="/menu" class="btn btn-primary">Ver Menu</a>
            <a routerLink="/reservas" class="btn btn-secondary">Reservar Mesa</a>
          </div>
        </div>
        <div class="hero-image">
          <!-- Imagem de fundo via CSS -->
        </div>
      </section>

      <!-- Destaques do Menu -->
      <section class="highlights">
        <div class="container">
          <h2 class="section-title">Nossos Destaques</h2>
          <div class="highlights-grid">
            <app-dish-card
              *ngFor="let dish of featuredDishes"
              [dish]="dish"
              (addToCart)="onAddToCart($event)">
            </app-dish-card>
          </div>
        </div>
      </section>

      <!-- Promoções -->
      <section class="promotions">
        <div class="container">
          <h2 class="section-title">Promoções Especiais</h2>
          <div class="promotion-cards">
            <div class="promotion-card">
              <div class="promotion-icon">🍷</div>
              <h3>Quinta do Vinho</h3>
              <p>Todas as quintas, 20% off em vinhos selecionados</p>
              <small>Das 18h às 22h</small>
            </div>
            <div class="promotion-card">
              <div class="promotion-icon">👨‍👩‍👧‍👦</div>
              <h3>Jantar em Família</h3>
              <p>Ganhe 1 sobremesa grátis para cada 3 pratos principais</p>
              <small>Válido aos finais de semana</small>
            </div>
            <div class="promotion-card">
              <div class="promotion-icon">🎂</div>
              <h3>Aniversariante</h3>
              <p>Traga sua documentação e ganhe uma taça de espumante</p>
              <small>Durante todo o mês</small>
            </div>
          </div>
        </div>
      </section>

      <!-- Sobre -->
      <section class="about">
        <div class="container">
          <div class="about-content">
            <div class="about-text">
              <h2>Sobre Nosso Restaurante</h2>
              <p>Há mais de 20 anos servindo pratos exclusivos com ingredientes selecionados diretamente dos produtores locais. Nosso compromisso é com a qualidade, sabor e experiência única.</p>
              <ul class="about-features">
                <li>📍 Localização privilegiada</li>
                <li>👨‍🍳 Chefs renomados</li>
                <li>🥗 Opções vegetarianas</li>
                <li>🎵 Ambiente climatizado com música ao vivo</li>
              </ul>
            </div>
            <div class="about-image">
              <!-- Imagem do restaurante -->
            </div>
          </div>
        </div>
      </section>

      <!-- Horário de Funcionamento -->
      <section class="hours">
        <div class="container">
          <h2>Horário de Funcionamento</h2>
          <div class="hours-grid">
            <div class="hours-day">
              <strong>Segunda - Quinta</strong>
              <span>11:30 - 15:00 | 18:00 - 23:00</span>
            </div>
            <div class="hours-day">
              <strong>Sexta - Sábado</strong>
              <span>11:30 - 16:00 | 18:00 - 00:00</span>
            </div>
            <div class="hours-day">
              <strong>Domingo</strong>
              <span>11:30 - 17:00</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      overflow-x: hidden;
    }

    /* Hero Section */
    .hero {
      position: relative;
      height: 70vh;
      min-height: 500px;
      display: flex;
      align-items: center;
      background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                  url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
      background-position: center;
      color: white;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      text-align: center;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-buttons .btn {
      min-width: 150px;
    }

    /* Section Titles */
    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #333;
      position: relative;
    }

    .section-title::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: #d32f2f;
      margin: 10px auto;
      border-radius: 2px;
    }

    /* Highlights */
    .highlights {
      padding: 5rem 0;
      background: #f8f9fa;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    /* Promoções */
    .promotions {
      padding: 5rem 0;
      background: white;
    }

    .promotion-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .promotion-card {
      background: #fff9f9;
      border: 2px solid #ffebee;
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s;
    }

    .promotion-card:hover {
      transform: translateY(-10px);
      border-color: #d32f2f;
    }

    .promotion-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .promotion-card h3 {
      color: #d32f2f;
      margin-bottom: 0.5rem;
    }

    .promotion-card p {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .promotion-card small {
      color: #888;
      font-size: 0.8rem;
    }

    /* About */
    .about {
      padding: 5rem 0;
      background: #f8f9fa;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-text h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .about-text p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .about-features {
      list-style: none;
      padding: 0;
    }

    .about-features li {
      padding: 0.5rem 0;
      color: #555;
      display: flex;
      align-items: center;
    }

    .about-features li::before {
      content: '✓';
      color: #4CAF50;
      font-weight: bold;
      margin-right: 10px;
    }

    .about-image {
      height: 400px;
      background: url('https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      border-radius: 15px;
    }

    /* Hours */
    .hours {
      padding: 5rem 0;
      background: white;
    }

    .hours-grid {
      max-width: 600px;
      margin: 0 auto;
      display: grid;
      gap: 1.5rem;
    }

    .hours-day {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }

    .hours-day:last-child {
      border-bottom: none;
    }

    .hours-day strong {
      color: #333;
    }

    .hours-day span {
      color: #666;
    }

    /* Responsividade */
    @media (max-width: 992px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
      }

      .about-image {
        height: 300px;
      }
    }

    @media (max-width: 768px) {
      .hero {
        height: 60vh;
        min-height: 400px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .hero-buttons .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredDishes: Dish[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.loadFeaturedDishes();
  }

  loadFeaturedDishes() {
    this.menuService.getDishes().subscribe((dishes: any) => {
      // Seleciona 3 pratos aleatórios como destaques
      this.featuredDishes = [...dishes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    });
  }

  onAddToCart(dish: Dish) {
    // Implementar lógica para adicionar ao carrinho
    console.log('Adicionar ao carrinho da home:', dish);
  }
}
