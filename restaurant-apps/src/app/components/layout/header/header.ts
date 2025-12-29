import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  totalItens$!: Observable<number>;
  isMenuOpen = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Converter para observable do total de itens
    this.totalItens$ = new Observable<number>(observer => {
      this.cartService.carrinho$.subscribe(itens => {
        const total = itens.reduce((sum, item) => sum + item.quantidade, 0);
        observer.next(total);
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
