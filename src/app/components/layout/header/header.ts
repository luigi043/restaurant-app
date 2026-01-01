import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  // Observable para o total de itens no carrinho
  totalItens$!: Observable<number>;

  // Controlar menu mobile
  isMenuOpen = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Inicializar observable do total de itens
    this.totalItens$ = this.cartService.carrinho$.pipe(
      map(itens => {
        return itens.reduce((total, item) => total + item.quantidade, 0);
      })
    );
  }

  // Método para alternar menu mobile
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Método para fechar menu após clique
  closeMenu() {
    this.isMenuOpen = false;
  }
}
