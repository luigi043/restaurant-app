import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Dados mockados do menu
  private menu: Dish[] = [
    {
      id: 1,
      name: 'Bruschetta',
      description: 'Pão crocante com tomate, manjericão e azeite',
      price: 25.90,
      category: 'entrada',
      image: 'assets/images/bruschetta.jpg',
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Pão italiano', 'Tomate', 'Manjericão', 'Azeite'],
      calories: 180
    },
    {
      id: 2,
      name: 'Filé Mignon',
      description: 'Filé mignon grelhado com molho de vinho tinto',
      price: 89.90,
      category: 'principal',
      image: 'assets/images/file-mignon.jpg',
      isVegetarian: false,
      isSpicy: false,
      ingredients: ['Filé mignon', 'Vinho tinto', 'Manteiga', 'Ervas'],
      calories: 420,
      preparationTime: 25
    },
    // Adicione mais pratos conforme necessário
  ];

  constructor() { }

  // Buscar todos os pratos
  getDishes(): Observable<Dish[]> {
    return of(this.menu).pipe(delay(500)); // Simula delay de rede
  }

  // Buscar prato por ID
  getDishById(id: number): Observable<Dish | undefined> {
    const dish = this.menu.find(d => d.id === id);
    return of(dish).pipe(delay(300));
  }

  // Filtrar pratos por categoria
  getDishesByCategory(category: string): Observable<Dish[]> {
    const filtered = this.menu.filter(d => d.category === category);
    return of(filtered);
  }

  // Buscar pratos vegetarianos
  getVegetarianDishes(): Observable<Dish[]> {
    return of(this.menu.filter(d => d.isVegetarian));
  }

  // Buscar pratos picantes
  getSpicyDishes(): Observable<Dish[]> {
    return of(this.menu.filter(d => d.isSpicy));
  }
}
