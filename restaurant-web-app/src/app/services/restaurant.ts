import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Prato, Categoria, Promocao } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // Dados dos pratos italianos
  private pratos: Prato[] = [
    // ENTRADAS
    {
      id: 1,
      nome: 'Bruschetta al Pomodoro',
      descricao: 'Pão italiano grelhado com tomate fresco, manjericão, alho e azeite extra virgem',
      preco: 8.90,
      categoria: 'entrada',
      imagem: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Pão ciabatta', 'Tomate san marzano', 'Manjericão fresco', 'Alho', 'Azeite extra virgem'],
      tempoPreparo: 10,
      calorias: 180
    },
    {
      id: 2,
      nome: 'Antipasto Misto',
      descricao: 'Seleção de frios italianos com prosciutto, salame, queijos e azeitonas',
      preco: 14.90,
      categoria: 'entrada',
      imagem: 'https://images.unsplash.com/photo-1559561726-8763c2b035ca?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: false,
      ingredientes: ['Prosciutto di Parma', 'Salame Milano', 'Mozzarella di Bufala', 'Queijo Parmigiano', 'Azeitonas'],
      tempoPreparo: 15,
      calorias: 320
    },
    {
      id: 3,
      nome: 'Carpaccio di Manzo',
      descricao: 'Finas fatias de carne crua temperada com azeite, limão, queijo parmesão e rúcula',
      preco: 16.50,
      categoria: 'entrada',
      imagem: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: true,
      ingredientes: ['Filé mignon', 'Queijo Parmigiano', 'Rúcula', 'Limão siciliano', 'Azeite trufado'],
      tempoPreparo: 20,
      calorias: 280
    },

    // PRATOS PRINCIPAIS
    {
      id: 4,
      nome: 'Spaghetti alla Carbonara',
      descricao: 'Massa tradicional com ovos, queijo pecorino romano, pancetta e pimenta preta',
      preco: 18.90,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: true,
      destaque: true,
      ingredientes: ['Spaghetti', 'Ovos', 'Pancetta', 'Queijo Pecorino', 'Pimenta preta'],
      tempoPreparo: 25,
      calorias: 650
    },
    {
      id: 5,
      nome: 'Osso Buco alla Milanese',
      descricao: 'Perna de vitela cozida lentamente com vinho branco, legumes e gremolata',
      preco: 32.90,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: true,
      ingredientes: ['Perna de vitela', 'Vinho branco', 'Cenoura', 'Aipo', 'Gremolata'],
      tempoPreparo: 120,
      calorias: 780
    },
    {
      id: 6,
      nome: 'Risotto ai Funghi Porcini',
      descricao: 'Arroz arbóreo cremoso com funghi porcini frescos, manteiga e queijo parmesão',
      preco: 22.50,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Arroz arbóreo', 'Funghi porcini', 'Caldo de legumes', 'Manteiga', 'Queijo Parmigiano'],
      tempoPreparo: 35,
      calorias: 520
    },
    {
      id: 7,
      nome: 'Saltimbocca alla Romana',
      descricao: 'Filés de vitela com presunto e sálvia, cozidos em vinho branco e manteiga',
      preco: 26.90,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: true,
      ingredientes: ['Filé de vitela', 'Prosciutto', 'Sálvia', 'Vinho branco', 'Manteiga'],
      tempoPreparo: 30,
      calorias: 620
    },
    {
      id: 8,
      nome: 'Lasagna alla Bolognese',
      descricao: 'Camadas de massa fresca com ragù à bolonhesa, besciamella e queijo',
      preco: 19.90,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: false,
      ingredientes: ['Massa para lasanha', 'Ragù bolonhesa', 'Besciamella', 'Queijo Mozzarella', 'Parmesão'],
      tempoPreparo: 45,
      calorias: 720
    },

    // PIZZAS (adicionando uma nova categoria ou usando "principal")
    {
      id: 9,
      nome: 'Pizza Margherita',
      descricao: 'Clássica pizza napolitana com molho de tomate, mozzarella di bufala e manjericão',
      preco: 15.90,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Massa napolitana', 'Molho de tomate', 'Mozzarella di Bufala', 'Manjericão fresco', 'Azeite'],
      tempoPreparo: 20,
      calorias: 850
    },
    {
      id: 10,
      nome: 'Pizza Quattro Stagioni',
      descricao: 'Pizza com quatro estações: alcachofras, presunto, cogumelos e azeitonas',
      preco: 18.50,
      categoria: 'principal',
      imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      vegetariano: false,
      picante: false,
      destaque: false,
      ingredientes: ['Alcachofras', 'Prosciutto', 'Cogumelos', 'Azeitonas', 'Mozzarella'],
      tempoPreparo: 25,
      calorias: 920
    },

    // SOBREMESAS
    {
      id: 11,
      nome: 'Tiramisù Classico',
      descricao: 'Sobremesa tradicional com biscoitos savoiardi embebidos em café e creme de mascarpone',
      preco: 9.90,
      categoria: 'sobremesa',
      imagem: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Biscoito Savoiardi', 'Café expresso', 'Mascarpone', 'Ovos', 'Cacau em pó'],
      tempoPreparo: 30,
      calorias: 380
    },
    {
      id: 12,
      nome: 'Panna Cotta ai Frutti di Bosco',
      descricao: 'Creme de baunilha coalhado servido com calda de frutas vermelhas',
      preco: 8.50,
      categoria: 'sobremesa',
      imagem: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Creme de leite', 'Baunilha', 'Gelatina', 'Frutas vermelhas', 'Açúcar'],
      tempoPreparo: 240, // 4 horas de refrigeração
      calorias: 320
    },
    {
      id: 13,
      nome: 'Cannoli Siciliani',
      descricao: 'Tubos crocantes de massa frita recheados com creme de ricota e frutas cristalizadas',
      preco: 7.90,
      categoria: 'sobremesa',
      imagem: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Massa de cannoli', 'Ricota', 'Açúcar de confeiteiro', 'Frutas cristalizadas', 'Pistache'],
      tempoPreparo: 40,
      calorias: 420
    },

    // BEBIDAS
    {
      id: 14,
      nome: 'Negroni',
      descricao: 'Coquetel clássico italiano com gin, vermute rosso e Campari',
      preco: 11.90,
      categoria: 'bebida',
      imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Gin', 'Vermute Rosso', 'Campari', 'Casca de laranja', 'Gelo'],
      tempoPreparo: 5,
      calorias: 180
    },
    {
      id: 15,
      nome: 'Aperol Spritz',
      descricao: 'Bebida refrescante com Aperol, prosecco e água com gás',
      preco: 9.50,
      categoria: 'bebida',
      imagem: 'https://images.unsplash.com/photo-1629456014706-4a1c6007a57f?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Aperol', 'Prosecco', 'Água com gás', 'Laranja', 'Gelo'],
      tempoPreparo: 5,
      calorias: 150
    },
    {
      id: 16,
      nome: 'Chianti Classico',
      descricao: 'Vinho tinto toscano DOCG, seco e encorpado, ideal para carnes',
      preco: 28.90,
      categoria: 'bebida',
      imagem: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: true,
      ingredientes: ['Uvas Sangiovese', 'Barrica de carvalho'],
      tempoPreparo: 2, // Tempo para servir
      calorias: 125
    },
    {
      id: 17,
      nome: 'Limoncello',
      descricao: 'Licor italiano feito com cascas de limão siciliano, servido gelado',
      preco: 6.90,
      categoria: 'bebida',
      imagem: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop',
      vegetariano: true,
      picante: false,
      destaque: false,
      ingredientes: ['Limões sicilianos', 'Álcool', 'Açúcar', 'Água'],
      tempoPreparo: 2,
      calorias: 200
    }
  ];

  private categorias: Categoria[] = [
    { id: 'entrada', nome: 'Antipasti', descricao: 'Para começar a refeição', icone: '🍴' },
    { id: 'principal', nome: 'Piatti Principali', descricao: 'Pratos principais italianos', icone: '🍝' },
    { id: 'bebida', nome: 'Bevande', descricao: 'Bebidas e vinhos', icone: '🍷' },
    { id: 'sobremesa', nome: 'Dolci', descricao: 'Sobremesas tradicionais', icone: '🍰' }
  ];

  private promocoes: Promocao[] = [
    {
      id: 1,
      titulo: 'Pasta Day',
      descricao: '20% de desconto em todos os pratos de massa às terças-feiras',
      codigo: 'PASTA20',
      desconto: 20,
      validoAte: new Date('2024-12-31')
    },
    {
      id: 2,
      titulo: 'Aperitivo Italiano',
      descricao: '1 Aperol Spritz grátis ao pedir qualquer antipasto',
      codigo: 'APERITIVO',
      desconto: 100,
      validoAte: new Date('2024-11-30')
    },
    {
      id: 3,
      titulo: 'Famiglia',
      descricao: '10% de desconto para grupos de 4 pessoas ou mais',
      codigo: 'FAMIGLIA10',
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

  // Novo método para buscar pratos por termo de busca
  buscarPratos(termo: string): Observable<Prato[]> {
    if (!termo.trim()) {
      return of(this.pratos).pipe(delay(300));
    }

    const termoLower = termo.toLowerCase();
    const resultados = this.pratos.filter(prato =>
      prato.nome.toLowerCase().includes(termoLower) ||
      prato.descricao.toLowerCase().includes(termoLower) ||
      prato.ingredientes.some(ing => ing.toLowerCase().includes(termoLower))
    );

    return of(resultados).pipe(delay(400));
  }
}
