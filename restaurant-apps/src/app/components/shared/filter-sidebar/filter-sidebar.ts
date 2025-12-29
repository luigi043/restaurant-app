import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/dish.model';

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

  filtros = {
    categoria: '',
    vegetariano: false,
    picante: false,
    precoMin: 0,
    precoMax: 200
  };

  aplicarFiltros() {
    this.filtrosAplicados.emit({ ...this.filtros });
  }

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
}
