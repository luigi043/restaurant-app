import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from "./pages/cart-sidebar/cart-sidebar";
import { FooterComponent } from "./components/footer/footer";
import { HeaderComponent } from "./components/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CartSidebarComponent,
    FooterComponent,
    HeaderComponent
],
  template: `
    <div class="app-container">
      <app-header></app-header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>

      <!-- Carrinho Sidebar (controlado por serviço) -->
      <app-cart-sidebar *ngIf="showCartSidebar"></app-cart-sidebar>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
    }
  `]
})
export class AppComponent {
   title = 'Restaurante App';
  showCartSidebar = false;
}
