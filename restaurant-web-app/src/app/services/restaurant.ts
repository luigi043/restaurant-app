import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Prato, Categoria, Promocao } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private pratos: Prato[] = [
    {
      id: 1,
      nome: 'Bruschetta Italiana',
      descricao: 'Pão italiano crocante com tomate fresco, manjericão e azeite',
      preco: 28.90,
      categoria: 'entrada',
      imagem: 'https://picsum.photos/400/300?food=1',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Pão italiano', 'Tomate', 'Manjericão', 'Azeite', 'Alho'],
      tempoPreparo: 10
    },
    {
      id: 2,
      nome: 'Filé Mignon ao Molho Madeira',
      descricao: 'Filé mignon grelhado com molho madeira e purê de batatas',
      preco: 89.90,
      categoria: 'principal',
      imagem: 'https://picsum.photos/400/300?food=2',
      vegetariano: false,
      picante: false,
      destaque: true,
      ingredientes: ['Filé mignon', 'Vinho madeira', 'Cebola', 'Cogumelos', 'Batatas'],
      tempoPreparo: 25,
      calorias: 650
    },
    {
      id: 3,
      nome: 'Salada Caesar',
      descricao: 'Salada fresca com frango grelhado, croutons e molho caesar',
      preco: 42.50,
      categoria: 'principal',
      imagem: 'https://picsum.photos/400/300?food=3',
      vegetariano: false,
      picante: false,
      destaque: false,
      ingredientes: ['Alface romana', 'Frango', 'Croutons', 'Queijo parmesão', 'Molho caesar'],
      tempoPreparo: 15,
      calorias: 420
    },
    {
      id: 4,
      nome: 'Tiramisu',
      descricao: 'Sobremesa italiana clássica com café e mascarpone',
      preco: 32.90,
      categoria: 'sobremesa',
      imagem: 'https://picsum.photos/400/300?food=4',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Biscoito champanhe', 'Café', 'Mascarpone', 'Ovos', 'Cacau'],
      tempoPreparo: 20,
      calorias: 380
    },
    {
      id: 5,
      nome: 'Margarita',
      descricao: 'Coquetel clássico com tequila, lime e sal',
      preco: 24.90,
      categoria: 'bebida',
      imagem: 'https://picsum.photos/400/300?food=5',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Tequila', 'Licor de laranja', 'Suco de lime', 'Sal'],
      tempoPreparo: 5
    },
    {
      id: 6,
      nome: 'Pasta Carbonara',
      descricao: 'Massa italiana com ovos, queijo pecorino, pancetta e pimenta',
      preco: 52.90,
      categoria: 'principal',
      imagem: 'https://picsum.photos/400/300?food=6',
      vegetariano: false,
      picante: true,
      destaque: true,
      ingredientes: ['Spaghetti', 'Ovos', 'Pancetta', 'Queijo pecorino', 'Pimenta'],
      tempoPreparo: 20,
      calorias: 580
    },
    {
      id: 7,
      nome: 'Carpaccio de Salmão',
      descricao: 'Finas fatias de salmão cru com limão siciliano e capers',
      preco: 45.90,
      categoria: 'entrada',
      imagem: 'https://picsum.photos/400/300?food=7',
      vegetariano: false,
      picante: false,
      destaque: false,
      ingredientes: ['Salmão', 'Limão siciliano', 'Capers', 'Azeite', 'Endro'],
      tempoPreparo: 15
    },
    {
      id: 8,
      nome: 'Mousse de Chocolate',
      descricao: 'Mousse cremosa de chocolate belga com raspas de laranja',
      preco: 26.90,
      categoria: 'sobremesa',
      imagem: 'https://picsum.photos/400/300?food=8',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Chocolate belga', 'Creme de leite', 'Ovos', 'Laranja', 'Açúcar'],
      tempoPreparo: 30,
      calorias: 320
    }
  ];

  private categorias: Categoria[] = [
    { id: 'entrada', nome: 'Entradas', descricao: 'Para começar bem', icone: '🍴' },
    { id: 'principal', nome: 'Pratos Principais', descricao: 'Nossas especialidades', icone: '🍝' },
    { id: 'bebida', nome: 'Bebidas', descricao: 'Para acompanhar', icone: '🍹' },
    { id: 'sobremesa', nome: 'Sobremesas', descricao: 'Para finalizar', icone: '🍰' }
  ];

  private promocoes: Promocao[] = [
    {
      id: 1,
      titulo: 'Primeira Visita',
      descricao: '15% de desconto na sua primeira compra',
      codigo: 'BEMVINDO15',
      desconto: 15,
      validoAte: new Date('2024-12-31')
    },
    {
      id: 2,
      titulo: 'Fim de Semana',
      descricao: '10% de desconto aos sábados e domingos',
      codigo: 'FDS10',
      desconto: 10,
      validoAte: new Date('2024-12-31')
    }
  ];

  constructor() {}

  getPratos(): Observable<Prato[]> {
    return of(this.pratos).pipe(delay(500));
  }

  getPratoPorId(id: number): Observable<Prato | undefined> {
    const prato = this.pratos.find(p => p.id === id);
    return of(prato).pipe(delay(300));
  }

  getPratosPorCategoria(categoria: string): Observable<Prato[]> {
    const pratosFiltrados = this.pratos.filter(p => p.categoria === categoria);
    return of(pratosFiltrados).pipe(delay(400));
  }

  getPratosDestaque(): Observable<Prato[]> {
    const destaque = this.pratos.filter(p => p.destaque);
    return of(destaque).pipe(delay(300));
  }

  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias);
  }

  getPromocoes(): Observable<Promocao[]> {
    return of(this.promocoes);
  }

  filtrarPratos(filtros: any): Observable<Prato[]> {
    let resultado = [...this.pratos];

    if (filtros.categoria) {
      resultado = resultado.filter(p => p.categoria === filtros.categoria);
    }

    if (filtros.vegetariano) {
      resultado = resultado.filter(p => p.vegetariano);
    }

    if (filtros.picante) {
      resultado = resultado.filter(p => p.picante);
    }

    if (filtros.precoMin) {
      resultado = resultado.filter(p => p.preco >= filtros.precoMin);
    }

    if (filtros.precoMax) {
      resultado = resultado.filter(p => p.preco <= filtros.precoMax);
    }

    return of(resultado).pipe(delay(600));
  }
}
