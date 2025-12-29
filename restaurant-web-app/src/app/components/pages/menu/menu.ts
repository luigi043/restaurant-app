import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant';
import { CartService } from '../../../services/cart';
import { Prato, Categoria } from '../../../models/dish';
import { MenuCardComponent } from '../../shared/menu-card/menu-card';
import { FilterSidebarComponent } from '../../shared/filter-sidebar/filter-sidebar';

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

  // Filtros atuais
  filtrosAtivos = {
    categoria: '',
    vegetariano: false,
    picante: false,
    precoMin: 0,
    precoMax: 200
  };

  // Estado da aplicação
  carregando = true;
  categoriaSelecionada = 'todas';
  mostrarFiltrosMobile = false;

  // Contadores
  totalPratos = 0;
  pratosEncontrados = 0;

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
        this.totalPratos = pratos.length;
        this.pratosEncontrados = pratos.length;
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

  // Aplicar filtros recebidos do sidebar
  aplicarFiltros(filtros: any) {
    this.filtrosAtivos = { ...filtros };
    this.filtrarPratos();
  }

  // Limpar todos os filtros
  limparFiltros() {
    this.filtrosAtivos = {
      categoria: '',
      vegetariano: false,
      picante: false,
      precoMin: 0,
      precoMax: 200
    };
    this.categoriaSelecionada = 'todas';
    this.pratosFiltrados = [...this.todosPratos];
    this.pratosEncontrados = this.todosPratos.length;
  }

  // Filtrar pratos com base nos filtros ativos
  filtrarPratos() {
    let resultado = [...this.todosPratos];

    // Filtrar por categoria
    if (this.filtrosAtivos.categoria) {
      resultado = resultado.filter(p => p.categoria === this.filtrosAtivos.categoria);
    }

    // Filtrar por vegetariano
    if (this.filtrosAtivos.vegetariano) {
      resultado = resultado.filter(p => p.vegetariano);
    }

    // Filtrar por picante
    if (this.filtrosAtivos.picante) {
      resultado = resultado.filter(p => p.picante);
    }

    // Filtrar por preço mínimo
    if (this.filtrosAtivos.precoMin > 0) {
      resultado = resultado.filter(p => p.preco >= this.filtrosAtivos.precoMin);
    }

    // Filtrar por preço máximo
    if (this.filtrosAtivos.precoMax < 200) {
      resultado = resultado.filter(p => p.preco <= this.filtrosAtivos.precoMax);
    }

    this.pratosFiltrados = resultado;
    this.pratosEncontrados = resultado.length;
  }

  // Selecionar categoria rápida
  selecionarCategoria(categoriaId: string) {
    this.categoriaSelecionada = categoriaId;
    this.filtrosAtivos.categoria = categoriaId === 'todas' ? '' : categoriaId;
    this.filtrarPratos();
  }

  // Adicionar prato ao carrinho
  adicionarAoCarrinho(prato: Prato) {
    this.cartService.adicionarAoCarrinho(prato);
  }

  // Alternar filtros mobile
  toggleFiltrosMobile() {
    this.mostrarFiltrosMobile = !this.mostrarFiltrosMobile;
  }

  // Formatar preço
  formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }
}
