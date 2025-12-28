import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private storageKey = 'restaurant_cart';

  constructor() {
    // Carregar carrinho do localStorage ao iniciar
    const savedCart = localStorage.getItem(this.storageKey);
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  // Observable para o carrinho
  getCartItems() {
    return this.cartItems.asObservable();
  }

  // Adicionar item ao carrinho
  addToCart(dish: Dish, quantity: number = 1, notes?: string) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.dish.id === dish.id);

    if (existingItemIndex > -1) {
      // Atualizar quantidade se item já existe
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      this.updateCart(updatedItems);
    } else {
      // Adicionar novo item
      const newItem: CartItem = { dish, quantity, notes };
      this.updateCart([...currentItems, newItem]);
    }
  }

  // Remover item do carrinho
  removeFromCart(dishId: number) {
    const updatedItems = this.cartItems.value.filter(item => item.dish.id !== dishId);
    this.updateCart(updatedItems);
  }

  // Atualizar quantidade
  updateQuantity(dishId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(dishId);
      return;
    }

    const updatedItems = this.cartItems.value.map(item =>
      item.dish.id === dishId ? { ...item, quantity } : item
    );
    this.updateCart(updatedItems);
  }

  // Limpar carrinho
  clearCart() {
    this.updateCart([]);
  }

  // Calcular total
  getTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.dish.price * item.quantity),
      0
    );
  }

  // Contar itens
  getItemCount(): number {
    return this.cartItems.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  // Método privado para atualizar carrinho e salvar no localStorage
  private updateCart(items: CartItem[]) {
    this.cartItems.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
