import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemCarrinho } from '../../../models/dish';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.scss']
})
export class CartItemComponent {
  @Input() item!: ItemCarrinho;
  @Output() quantidadeAlterada = new EventEmitter<number>();
  @Output() itemRemovido = new EventEmitter<void>();

  // Quantidade atual
  quantidade = 1;

  ngOnInit() {
    this.quantidade = this.item.quantidade;
  }

  // Aumentar quantidade
  aumentarQuantidade() {
    this.quantidade++;
    this.quantidadeAlterada.emit(this.quantidade);
  }

  // Diminuir quantidade
  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.quantidadeAlterada.emit(this.quantidade);
    }
  }

  // Atualizar quantidade via input
  atualizarQuantidade(event: Event) {
    const input = event.target as HTMLInputElement;
    const novaQuantidade = parseInt(input.value, 10);

    if (!isNaN(novaQuantidade) && novaQuantidade > 0) {
      this.quantidade = novaQuantidade;
      this.quantidadeAlterada.emit(this.quantidade);
    } else {
      // Se valor inválido, volta para o anterior
      input.value = this.quantidade.toString();
    }
  }

  // Remover item
  removerItem() {
    this.itemRemovido.emit();
  }

  // Calcular subtotal
  calcularSubtotal(): number {
    return this.item.prato.preco * this.quantidade;
  }

  // Formatar preço em Euro
  formatarPreco(preco: number): string {
    return `${preco.toFixed(2).replace('.', ',')} €`;
  }
}
