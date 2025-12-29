import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant';
import { CartService } from '../../../services/cart';
import { Prato } from '../../../models/dish';

@Component({
  selector: 'app-dish-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dish-detail.html',
  styleUrls: ['./dish-detail.scss']
})
export class DishDetailComponent implements OnInit {
[x: string]: any;
  // Dados do prato
  prato: Prato | null = null;

  // Estado
  carregando = true;
  erro = false;
  mensagemErro = '';

  // Controle de quantidade
  quantidade = 1;
  minQuantidade = 1;
  maxQuantidade = 10;

  // Pratos relacionados
  pratosRelacionados: Prato[] = [];

  // Modo de visualização
  modoVisualizacao: 'descricao' | 'ingredientes' | 'nutricional' = 'descricao';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.carregarPrato();
  }

  carregarPrato() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || isNaN(parseInt(id))) {
      this.erro = true;
      this.mensagemErro = 'Prato não encontrado';
      this.carregando = false;
      return;
    }

    const pratoId = parseInt(id, 10);

    this.restaurantService.getPratoPorId(pratoId).subscribe({
      next: (prato) => {
        if (prato) {
          this.prato = prato;
          this.carregarPratosRelacionados(prato.categoria, pratoId);
          this.carregando = false;
        } else {
          this.erro = true;
          this.mensagemErro = 'Prato não encontrado';
          this.carregando = false;
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar prato:', erro);
        this.erro = true;
        this.mensagemErro = 'Erro ao carregar informações do prato';
        this.carregando = false;
      }
    });
  }

  carregarPratosRelacionados(categoria: string, pratoId: number) {
    this.restaurantService.getPratosPorCategoria(categoria).subscribe({
      next: (pratos) => {
        // Filtrar o prato atual e limitar a 4 pratos relacionados
        this.pratosRelacionados = pratos
          .filter(p => p.id !== pratoId)
          .slice(0, 4);
      },
      error: (erro) => {
        console.error('Erro ao carregar pratos relacionados:', erro);
      }
    });
  }
// Métodos auxiliares para o template
contemOvo(): boolean {
  if (!this.prato) return false;
  return this.prato.ingredientes.some(i =>
    i.toLowerCase().includes('ovo') ||
    i.toLowerCase().includes('egg') ||
    i.toLowerCase().includes('ovos')
  );
}

// Verificar se contém glúten
contemGluten(): boolean {
  if (!this.prato) return false;
  const ingredientesComGluten = ['farinha', 'trigo', 'glúten', 'pão', 'massa', 'spaghetti', 'lasanha'];
  return this.prato.ingredientes.some(i =>
    ingredientesComGluten.some(gluten => i.toLowerCase().includes(gluten))
  );
}

// Verificar se contém lactose
contemLactose(): boolean {
  if (!this.prato) return false;
  const ingredientesComLactose = ['queijo', 'manteiga', 'leite', 'creme', 'mascarpone', 'mozzarella', 'parmesão'];
  return this.prato.ingredientes.some(i =>
    ingredientesComLactose.some(lactose => i.toLowerCase().includes(lactose))
  );
}

// Verificar se é vegano (não contém produtos animais)
get isVegano(): boolean {
  if (!this.prato) return false;
  const ingredientesAnimais = ['carne', 'frango', 'peixe', 'salmão', 'presunto', 'prosciutto', 'ovo', 'ovos', 'queijo', 'manteiga'];
  return !this.prato.ingredientes.some(i =>
    ingredientesAnimais.some(animal => i.toLowerCase().includes(animal))
  );
}

// Obter lista de alérgenos
getAlergenos(): string[] {
  const alergenos: string[] = [];

  if (this.contemGluten()) alergenos.push('Glúten');
  if (this.contemLactose()) alergenos.push('Lactose');
  if (this.contemOvo()) alergenos.push('Ovos');

  return alergenos;
}

  // Controle de quantidade
  aumentarQuantidade() {
    if (this.quantidade < this.maxQuantidade) {
      this.quantidade++;
    }
  }

  diminuirQuantidade() {
    if (this.quantidade > this.minQuantidade) {
      this.quantidade--;
    }
  }

  atualizarQuantidade(event: Event) {
    const input = event.target as HTMLInputElement;
    const novaQuantidade = parseInt(input.value, 10);

    if (!isNaN(novaQuantidade) && novaQuantidade >= this.minQuantidade && novaQuantidade <= this.maxQuantidade) {
      this.quantidade = novaQuantidade;
    } else {
      input.value = this.quantidade.toString();
    }
  }

  // Adicionar ao carrinho
  adicionarAoCarrinho() {
    if (this.prato) {
      this.cartService.adicionarAoCarrinho(this.prato, this.quantidade);

      // Feedback visual (poderia ser um toast)
      console.log(`${this.prato.nome} adicionado ao carrinho!`);
    }
  }

  // Comprar agora (adiciona ao carrinho e vai para checkout)
  comprarAgora() {
    if (this.prato) {
      this.cartService.adicionarAoCarrinho(this.prato, this.quantidade);
      this.router.navigate(['/cart']);
    }
  }

  // Formatar preço
  formatarPreco(preco: number): string {
    return `${preco.toFixed(2).replace('.', ',')} €`;
  }

  // Calcular total
  calcularTotal(): number {
    return this.prato ? this.prato.preco * this.quantidade : 0;
  }

  // Mudar modo de visualização
  mudarModoVisualizacao(modo: 'descricao' | 'ingredientes' | 'nutricional') {
    this.modoVisualizacao = modo;
  }

  // Verificar se prato é vegetariano
  get isVegetariano(): boolean {
    return this.prato?.vegetariano || false;
  }

  // Verificar se prato é picante
  get isPicante(): boolean {
    return this.prato?.picante || false;
  }

  // Verificar se prato está em destaque
  get isDestaque(): boolean {
    return this.prato?.destaque || false;
  }

  // Obter ícone da categoria
  getCategoriaIcon(categoria: string): string {
    const icons: {[key: string]: string} = {
      'entrada': '🍴',
      'principal': '🍝',
      'bebida': '🍷',
      'sobremesa': '🍰'
    };
    return icons[categoria] || '🍽️';
  }

  // Voltar para cardápio
  voltarParaCardapio() {
    this.router.navigate(['/menu']);
  }
}
