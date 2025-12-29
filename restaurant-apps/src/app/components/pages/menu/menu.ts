import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant';
import { CartService } from '../../../services/cart';
import { Prato, Categoria } from '../../../models/dish.model';
import {  FilterSidebarComponent } from '../../shared/filter-sidebar/filter-sidebar';
import { MenuCardComponent } from '../../shared/menu-card/menu-card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuCardComponent,
    FilterSidebarComponent
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {
  // Arrays de dados
  todosPratos: Prato[] = [];
  pratosFiltrados: Prato[] = [];
  categorias: Categoria[] = [];

  // Filtros ativos
  filtros = {
    categoria: '',
    vegetariano: false,
    picante: false,
    precoMin: 0,
    precoMax: 200
  };

  // Estado
  carregando = true;
  categoriaSelecionada = 'todas';

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Buscar todos os pratos
    this.restaurantService.getPratos().subscribe({
      next: (pratos) => {
        this.todosPratos = pratos;
        this.pratosFiltrados = [...pratos];
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pratos:', erro);
        this.carregando = false;
      }
    });

    // Buscar categorias
    this.restaurantService.getCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
      }
    });
  }

  // Aplicar filtros
  aplicarFiltros(filtros: any) {
    this.filtros = { ...filtros };
    this.filtrarPratos();
  }

  // Filtrar pratos baseado nos filtros ativos
  filtrarPratos() {
    this.restaurantService.filtrarPratos(this.filtros).subscribe({
      next: (pratos) => {
        this.pratosFiltrados = pratos;
      },
      error: (erro) => {
        console.error('Erro ao filtrar pratos:', erro);
      }
    });
  }

  // Selecionar categoria
  selecionarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
    this.filtros.categoria = categoria === 'todas' ? '' : categoria;
    this.filtrarPratos();
  }

  // Adicionar ao carrinho
  adicionarAoCarrinho(prato: Prato) {
    this.cartService.adicionarAoCarrinho(prato);
  }

  // Limpar filtros
  limparFiltros() {
    this.filtros = {
      categoria: '',
      vegetariano: false,
      picante: false,
      precoMin: 0,
      precoMax: 200
    };
    this.categoriaSelecionada = 'todas';
    this.pratosFiltrados = [...this.todosPratos];
  }
}
