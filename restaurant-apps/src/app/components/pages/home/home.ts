import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Prato, Promocao } from '../../../models/dish.model';
import { RestaurantService } from '../../../services/restaurant';
import { HeroSectionComponent } from '../../shared/hero-section/hero-section';
import { MenuCardComponent } from '../../shared/menu-card/menu-card';
import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuCardComponent,
    PromoBannerComponent,
    HeroSectionComponent
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

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Buscar pratos em destaque
    this.restaurantService.getPratosDestaque().subscribe({
      next: (pratos: Prato[]) => {
        this.pratosDestaque = pratos;
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar pratos:', erro);
        this.carregando = false;
      }
    });

    // Buscar promoções
    this.restaurantService.getPromocoes().subscribe({
      next: (promos: Promocao[]) => {
        this.promocoes = promos;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar promoções:', erro);
      }
    });
  }
}
