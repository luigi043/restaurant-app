import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <!-- Logo e Descrição -->
        <div class="footer-section">
          <h3 class="footer-logo">Restaurante Sabor</h3>
          <p class="footer-description">
            Servindo pratos excepcionais desde 2000.
            Qualidade, sabor e experiência única.
          </p>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
            <a href="#" class="social-link">📹</a>
          </div>
        </div>

        <!-- Links Rápidos -->
        <div class="footer-section">
          <h4>Links Rápidos</h4>
          <ul class="footer-links">
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/menu">Menu</a></li>
            <li><a routerLink="/reservas">Reservas</a></li>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        <!-- Categorias -->
        <div class="footer-section">
          <h4>Categorias</h4>
          <ul class="footer-links">
            <li><a href="/menu?category=entrada">Entradas</a></li>
            <li><a href="/menu?category=principal">Pratos Principais</a></li>
            <li><a href="/menu?category=sobremesa">Sobremesas</a></li>
            <li><a href="/menu?category=bebida">Bebidas</a></li>
            <li><a href="/menu?vegetarian=true">Vegetariano</a></li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="footer-section">
          <h4>Contato</h4>
          <ul class="contact-info">
            <li>📍 Av. Principal, 1234 - Centro</li>
            <li>📞 (11) 3333-4444</li>
            <li>✉️ contato@restaurantesabor.com</li>
            <li>⏰ Seg-Dom: 11:30 - 23:00</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Restaurante Sabor. Todos os direitos reservados.</p>
        <div class="footer-legal">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #2c3e50;
      color: white;
      padding-top: 3rem;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h3, .footer-section h4 {
      margin-bottom: 1.5rem;
      color: white;
    }

    .footer-logo {
      font-size: 1.8rem;
      color: #d32f2f;
    }

    .footer-description {
      color: #bdc3c7;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      transition: background 0.3s;

      &:hover {
        background: #d32f2f;
      }
    }

    .footer-links, .contact-info {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li, .contact-info li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #d32f2f;
      }
    }

    .contact-info li {
      color: #bdc3c7;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-top: 3rem;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .footer-bottom p {
      color: #95a5a6;
      margin: 0;
    }

    .footer-legal {
      display: flex;
      gap: 2rem;
    }

    .footer-legal a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: white;
      }
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .footer-legal {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
