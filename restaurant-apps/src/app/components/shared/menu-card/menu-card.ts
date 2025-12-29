import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Prato } from '../../../models/dish.model';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-card.html',
  styleUrls: ['./menu-card.scss']
})
export class MenuCardComponent {
  // Input para receber dados do prato
  @Input() prato!: Prato;

  // Input para controlar se mostra botão de ação
  @Input() showButton: boolean = true;

  // Output para emitir eventos
  @Output() adicionarCarrinho = new EventEmitter<Prato>();

  // Método para adicionar ao carrinho
  adicionarAoCarrinho() {
    this.adicionarCarrinho.emit(this.prato);
  }

  // Método para verificar se é vegetariano
  get isVegetariano(): boolean {
    return this.prato.vegetariano;
  }

  // Método para verificar se é picante
  get isPicante(): boolean {
    return this.prato.picante;
  }

  // Método para formatar preço
  formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }
}
