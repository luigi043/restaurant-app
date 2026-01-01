import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart';
import { ItemCarrinho } from '../../../models/dish';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // Formulários
  dadosEntregaForm: FormGroup;
  pagamentoForm: FormGroup;

  // Itens do carrinho
  itensCarrinho: ItemCarrinho[] = [];

  // Totais
  subtotal = 0;
  taxaEntrega = 0;
  total = 0;

  // Etapas do checkout
  etapas = [
    { id: 1, nome: 'Entrega', ativa: true, concluida: false },
    { id: 2, nome: 'Pagamento', ativa: false, concluida: false },
    { id: 3, nome: 'Confirmação', ativa: false, concluida: false }
  ];

  etapaAtual = 1;

  // Métodos de pagamento
  metodosPagamento = [
    { id: 'cartao', nome: 'Cartão de Crédito', icone: '💳' },
    { id: 'debito', nome: 'Cartão de Débito', icone: '💳' },
    { id: 'dinheiro', nome: 'Dinheiro', icone: '💰' },
    { id: 'pix', nome: 'PIX', icone: '📱' }
  ];

  metodoPagamentoSelecionado = 'cartao';

  // Estados
  carregando = false;
  pedidoRealizado = false;
  numeroPedido = '';

  // Subscrições
  private carrinhoSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Inicializar formulário de entrega
    this.dadosEntregaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      endereco: ['', [Validators.required, Validators.minLength(10)]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)]],
      observacoes: ['']
    });

    // Inicializar formulário de pagamento
    this.pagamentoForm = this.fb.group({
      numeroCartao: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      nomeCartao: ['', [Validators.required, Validators.minLength(3)]],
      validade: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });
  }

  ngOnInit() {
    this.carregarCarrinho();
    this.gerarNumeroPedido();
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

        // Se o carrinho estiver vazio, redireciona
        if (itens.length === 0 && !this.pedidoRealizado) {
          this.router.navigate(['/cart']);
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar carrinho:', erro);
      }
    });
  }


  // Método para obter nome do método de pagamento
getNomeMetodoPagamento(): string {
  const metodo = this.metodosPagamento.find(m => m.id === this.metodoPagamentoSelecionado);
  return metodo ? metodo.nome : 'Não selecionado';
}
  gerarNumeroPedido() {
    const data = new Date();
    const timestamp = data.getTime();
    const random = Math.floor(Math.random() * 10000);
    this.numeroPedido = `IT${timestamp.toString().slice(-6)}${random.toString().padStart(4, '0')}`;
  }

  calcularTotais() {
    this.subtotal = this.cartService.calcularTotal();
    this.taxaEntrega = this.subtotal >= 30 || this.subtotal === 0 ? 0 : 4.99;
    this.total = this.subtotal + this.taxaEntrega;
  }

  // Navegação entre etapas
  avancarEtapa() {
    if (this.etapaAtual < 3) {
      // Valida a etapa atual antes de avançar
      if (this.etapaAtual === 1 && !this.dadosEntregaForm.valid) {
        this.marcarFormularioComoModificado(this.dadosEntregaForm);
        return;
      }

      if (this.etapaAtual === 2 && this.metodoPagamentoSelecionado === 'cartao' && !this.pagamentoForm.valid) {
        this.marcarFormularioComoModificado(this.pagamentoForm);
        return;
      }

      this.etapas[this.etapaAtual - 1].concluida = true;
      this.etapas[this.etapaAtual - 1].ativa = false;
      this.etapaAtual++;
      this.etapas[this.etapaAtual - 1].ativa = true;
    }
  }

  voltarEtapa() {
    if (this.etapaAtual > 1) {
      this.etapas[this.etapaAtual - 1].ativa = false;
      this.etapaAtual--;
      this.etapas[this.etapaAtual - 1].ativa = true;
      this.etapas[this.etapaAtual - 1].concluida = false;
    }
  }

  // Finalizar pedido
  finalizarPedido() {
    this.carregando = true;

    // Simular processamento do pedido
    setTimeout(() => {
      this.etapas[1].concluida = true;
      this.etapaAtual = 3;
      this.etapas[2].ativa = true;
      this.pedidoRealizado = true;
      this.carregando = false;

      // Limpar carrinho após finalização
      this.cartService.limparCarrinho();
    }, 2000);
  }

  // Formatar preço
  formatarPreco(preco: number): string {
    return `${preco.toFixed(2).replace('.', ',')} €`;
  }

  // Voltar para o carrinho
  voltarParaCarrinho() {
    this.router.navigate(['/cart']);
  }

  // Fazer novo pedido
  fazerNovoPedido() {
    this.router.navigate(['/menu']);
  }

  // Helper para marcar todos os campos como modificados
  private marcarFormularioComoModificado(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsTouched();
    });
  }

  // Getters para validação
  get f() {
    return this.dadosEntregaForm.controls;
  }

  get p() {
    return this.pagamentoForm.controls;
  }

  // Verificar se entrega é grátis
  get temEntregaGratis(): boolean {
    return this.subtotal >= 30 && this.subtotal > 0;
  }
}
