import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Prato } from '../../../models/dish';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-card.html',
  styleUrls: ['./menu-card.scss']
})
export class MenuCardComponent {
  @Input() prato!: Prato;
  @Input() showButton: boolean = true;
  @Output() adicionarCarrinho = new EventEmitter<Prato>();

  adicionarAoCarrinho() {
    this.adicionarCarrinho.emit(this.prato);
  }

  get isVegetariano(): boolean {
    return this.prato.vegetariano;
  }

  get isPicante(): boolean {
    return this.prato.picante;
  }

  formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  getCategoriaIcon(categoria: string): string {
    const icons: {[key: string]: string} = {
      'entrada': '🍴',
      'principal': '🍝',
      'bebida': '🍹',
      'sobremesa': '🍰'
    };
    return icons[categoria] || '🍽️';
  }
}
