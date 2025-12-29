import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart';
import { ItemCarrinho } from '../../../models/dish';
import { CartItemComponent } from '../../shared/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  // Itens do carrinho
  itensCarrinho: ItemCarrinho[] = [];

  // Totais
  subtotal = 0;
  taxaEntrega = 0;
  total = 0;

  // Estado
  carregando = false;

  // Subscrições
  private carrinhoSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  ngOnDestroy() {
    if (this.carrinhoSubscription) {
      this.carrinhoSubscription.unsubscribe();
    }
  }

  carregarCarrinho() {
    this.carrinhoSubscription = this.cartService.carrinho$.subscribe({
      next: (itens) => {
        this.itensCarrinho = itens;
        this.calcularTotais();
      },
      error: (erro) => {
        console.error('Erro ao carregar carrinho:', erro);
      }
    });
  }

  // Calcular todos os totais
  calcularTotais() {
    this.subtotal = this.cartService.calcularTotal();

    // Calcular taxa de entrega (grátis para pedidos acima de 30€)
    this.taxaEntrega = this.subtotal >= 30 || this.subtotal === 0 ? 0 : 4.99;

    this.total = this.subtotal + this.taxaEntrega;
  }

  // Atualizar quantidade de um item
  atualizarQuantidade(itemId: number, novaQuantidade: number) {
    this.cartService.atualizarQuantidade(itemId, novaQuantidade);
  }

  // Remover item do carrinho
  removerItem(itemId: number) {
    this.cartService.removerDoCarrinho(itemId);
  }

  // Limpar carrinho completo
  limparCarrinho() {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      this.cartService.limparCarrinho();
    }
  }

  // Continuar comprando
  continuarComprando() {
    this.router.navigate(['/menu']);
  }

  // Prosseguir para checkout
  prosseguirCheckout() {
    if (this.itensCarrinho.length === 0) {
      alert('Seu carrinho está vazio. Adicione itens antes de prosseguir.');
      return;
    }

    this.router.navigate(['/checkout']);
  }

  // Formatar preço em Euro
  formatarPreco(preco: number): string {
    return `${preco.toFixed(2).replace('.', ',')} €`;
  }

  // Verificar se tem entrega grátis
  get temEntregaGratis(): boolean {
    return this.subtotal >= 30 && this.subtotal > 0;
  }

  // Calcular quanto falta para entrega grátis
  get faltaParaEntregaGratis(): number {
    return Math.max(0, 30 - this.subtotal);
  }
}
