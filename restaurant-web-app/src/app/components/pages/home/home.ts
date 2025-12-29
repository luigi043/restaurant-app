import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant';
import { CartService } from '../../../services/cart';
import { Prato, Promocao } from '../../../models/dish';
import { MenuCardComponent } from '../../shared/menu-card/menu-card';
import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner';
import { HeroSectionComponent } from '../../shared/hero-section/hero-section';
import { EmptyStateComponent } from "../../shared/empty-state/empty-state";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    MenuCardComponent,
    PromoBannerComponent,
    EmptyStateComponent
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  // Array de pratos em destaque
  pratosDestaque: Prato[] = [];

  // Array de promoções
  promocoes: Promocao[] = [];

  // Flag para controlar loading
  carregando = true;

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Buscar pratos em destaque
    this.restaurantService.getPratosDestaque().subscribe({
      next: (pratos) => {
        this.pratosDestaque = pratos;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pratos:', erro);
        this.carregando = false;
      }
    });

    // Buscar promoções
    this.restaurantService.getPromocoes().subscribe({
      next: (promos) => {
        this.promocoes = promos;
      },
      error: (erro) => {
        console.error('Erro ao carregar promoções:', erro);
      }
    });
  }

  // Método para adicionar ao carrinho
  adicionarAoCarrinho(prato: Prato) {
    this.cartService.adicionarAoCarrinho(prato);
  }
}
