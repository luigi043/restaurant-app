import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/dish';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.html',
  styleUrls: ['./filter-sidebar.scss']
})
export class FilterSidebarComponent {
  @Input() categorias: Categoria[] = [];
  @Output() filtrosAplicados = new EventEmitter<any>();
  @Output() filtrosLimpos = new EventEmitter<void>();

  // Valores iniciais dos filtros
filtros = {
  categoria: '',
  vegetariano: false,
  picante: false,
  precoMin: 0,
  precoMax: 50 // Alterado de 200 para 50 €
};

  // Aplicar filtros
  aplicarFiltros() {
    this.filtrosAplicados.emit({ ...this.filtros });
  }

  // Limpar todos os filtros
  limparFiltros() {
    this.filtros = {
      categoria: '',
      vegetariano: false,
      picante: false,
      precoMin: 0,
      precoMax: 200
    };
    this.filtrosLimpos.emit();
  }

  // Formatar preço para exibição
 formatarPreco(preco: number): string {
  return `${preco.toFixed(2).replace('.', ',')} €`;
}

  // Getter para valor atual do preço mínimo
  get precoMinValue(): number {
    return this.filtros.precoMin;
  }

  // Getter para valor atual do preço máximo
  get precoMaxValue(): number {
    return this.filtros.precoMax;
  }
}
