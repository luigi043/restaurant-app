import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinho, Prato } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itensCarrinho: ItemCarrinho[] = [];
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);

  carrinho$ = this.carrinhoSubject.asObservable();

  constructor() {
    // Carregar carrinho do localStorage se existir
    const carrinhoSalvo = localStorage.getItem('carrinhoRestaurante');
    if (carrinhoSalvo) {
      this.itensCarrinho = JSON.parse(carrinhoSalvo);
      this.carrinhoSubject.next(this.itensCarrinho);
    }
  }

  // Adicionar item ao carrinho
  adicionarAoCarrinho(prato: Prato, quantidade: number = 1): void {
    const itemExistente = this.itensCarrinho.find(item => item.prato.id === prato.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itensCarrinho.push({ prato, quantidade });
    }

    this.atualizarCarrinho();
  }

  // Remover item do carrinho
  removerDoCarrinho(pratoId: number): void {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.prato.id !== pratoId);
    this.atualizarCarrinho();
  }

  // Atualizar quantidade de um item
  atualizarQuantidade(pratoId: number, quantidade: number): void {
    const item = this.itensCarrinho.find(item => item.prato.id === pratoId);

    if (item) {
      if (quantidade <= 0) {
        this.removerDoCarrinho(pratoId);
      } else {
        item.quantidade = quantidade;
        this.atualizarCarrinho();
      }
    }
  }

  // Limpar carrinho
  limparCarrinho(): void {
    this.itensCarrinho = [];
    this.atualizarCarrinho();
  }

  // Calcular total
  calcularTotal(): number {
    return this.itensCarrinho.reduce((total, item) => {
      return total + (item.prato.preco * item.quantidade);
    }, 0);
  }

  // Contar itens totais
  contarItens(): number {
    return this.itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  // Método privado para atualizar estado e localStorage
  private atualizarCarrinho(): void {
    this.carrinhoSubject.next([...this.itensCarrinho]);
    localStorage.setItem('carrinhoRestaurante', JSON.stringify(this.itensCarrinho));
  }

  // Buscar itens do carrinho
  getItens(): ItemCarrinho[] {
    return [...this.itensCarrinho];
  }
}
