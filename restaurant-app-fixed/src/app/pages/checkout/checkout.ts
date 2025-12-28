import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/dish';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="checkout-page">
      <div class="container">
        <h1 class="page-title">Finalizar Pedido</h1>

        <div class="checkout-grid">
          <!-- Formulário -->
          <div class="checkout-form">
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
              <!-- Dados Pessoais -->
              <fieldset class="form-section">
                <legend>Dados Pessoais</legend>

                <div class="form-group">
                  <label for="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    formControlName="name"
                    [class.invalid]="isFieldInvalid('name')"
                    placeholder="Digite seu nome">
                  <div *ngIf="isFieldInvalid('name')" class="error-message">
                    Nome é obrigatório
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      [class.invalid]="isFieldInvalid('email')"
                      placeholder="seu@email.com">
                    <div *ngIf="isFieldInvalid('email')" class="error-message">
                      E-mail inválido
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      formControlName="phone"
                      [class.invalid]="isFieldInvalid('phone')"
                      placeholder="(11) 99999-9999">
                    <div *ngIf="isFieldInvalid('phone')" class="error-message">
                      Telefone é obrigatório
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- Endereço -->
              <fieldset class="form-section">
                <legend>Endereço de Entrega</legend>

                <div class="form-row">
                  <div class="form-group">
                    <label for="cep">CEP *</label>
                    <input
                      type="text"
                      id="cep"
                      formControlName="cep"
                      [class.invalid]="isFieldInvalid('cep')"
                      placeholder="00000-000"
                      (blur)="buscarCEP()">
                    <div *ngIf="isFieldInvalid('cep')" class="error-message">
                      CEP inválido
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Endereço *</label>
                  <input
                    type="text"
                    id="address"
                    formControlName="address"
                    [class.invalid]="isFieldInvalid('address')"
                    placeholder="Rua, Avenida, etc.">
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="number">Número *</label>
                    <input
                      type="text"
                      id="number"
                      formControlName="number"
                      [class.invalid]="isFieldInvalid('number')"
                      placeholder="123">
                  </div>

                  <div class="form-group">
                    <label for="complement">Complemento</label>
                    <input
                      type="text"
                      id="complement"
                      formControlName="complement"
                      placeholder="Apto, Bloco, etc.">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="neighborhood">Bairro *</label>
                    <input
                      type="text"
                      id="neighborhood"
                      formControlName="neighborhood"
                      [class.invalid]="isFieldInvalid('neighborhood')">
                  </div>

                  <div class="form-group">
                    <label for="city">Cidade *</label>
                    <input
                      type="text"
                      id="city"
                      formControlName="city"
                      [class.invalid]="isFieldInvalid('city')">
                  </div>

                  <div class="form-group">
                    <label for="state">Estado *</label>
                    <select
                      id="state"
                      formControlName="state"
                      [class.invalid]="isFieldInvalid('state')">
                      <option value="">Selecione</option>
                      <option *ngFor="let estado of estados" [value]="estado.sigla">
                        {{ estado.nome }}
                      </option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <!-- Pagamento -->
              <fieldset class="form-section">
                <legend>Forma de Pagamento</legend>

                <div class="payment-methods">
                  <label class="payment-option">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="credit-card">
                    <span>💳 Cartão de Crédito</span>
                  </label>

                  <label class="payment-option">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="debit-card">
                    <span>🏦 Cartão de Débito</span>
                  </label>

                  <label class="payment-option">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="pix">
                    <span>📱 PIX</span>
                  </label>

                  <label class="payment-option">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="cash">
                    <span>💵 Dinheiro</span>
                  </label>
                </div>
                <div *ngIf="isFieldInvalid('paymentMethod')" class="error-message">
                  Selecione uma forma de pagamento
                </div>

                <!-- Detalhes do cartão (se selecionado) -->
                <div *ngIf="showCardFields()" class="card-details">
                  <div class="form-group">
                    <label for="cardNumber">Número do Cartão</label>
                    <input
                      type="text"
                      id="cardNumber"
                      formControlName="cardNumber"
                      placeholder="1234 5678 9012 3456">
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="cardExpiry">Validade</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        formControlName="cardExpiry"
                        placeholder="MM/AA">
                    </div>

                    <div class="form-group">
                      <label for="cardCVC">CVC</label>
                      <input
                        type="text"
                        id="cardCVC"
                        formControlName="cardCVC"
                        placeholder="123">
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- Observações -->
              <div class="form-group">
                <label for="notes">Observações do Pedido</label>
                <textarea
                  id="notes"
                  formControlName="notes"
                  rows="3"
                  placeholder="Alguma observação sobre o pedido?"></textarea>
              </div>

              <!-- Termos -->
              <div class="form-group terms">
                <label>
                  <input type="checkbox" formControlName="acceptTerms">
                  Li e concordo com os
                  <a href="#" class="terms-link">Termos de Serviço</a>
                </label>
                <div *ngIf="isFieldInvalid('acceptTerms')" class="error-message">
                  Você deve aceitar os termos
                </div>
              </div>

              <!-- Botões -->
              <div class="form-actions">
                <button type="button" class="btn btn-secondary" routerLink="/menu">
                  Continuar Comprando
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="checkoutForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Confirmar Pedido</span>
                  <span *ngIf="isSubmitting">Processando...</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Resumo do Pedido -->
          <div class="order-summary">
            <div class="summary-card">
              <h3>Resumo do Pedido</h3>

              <div class="order-items" *ngIf="items.length > 0">
                <div *ngFor="let item of items" class="order-item">
                  <span class="item-name">{{ item.dish.name }} × {{ item.quantity }}</span>
                  <span class="item-price">R$ {{ (item.dish.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>

              <div *ngIf="items.length === 0" class="empty-order">
                <p>Seu carrinho está vazio</p>
                <button class="btn btn-primary" routerLink="/menu">
                  Ver Menu
                </button>
              </div>

              <div class="order-totals">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>R$ {{ getSubtotal().toFixed(2) }}</span>
                </div>
                <div class="total-row">
                  <span>Taxa de Entrega</span>
                  <span>R$ {{ deliveryFee.toFixed(2) }}</span>
                </div>
                <div class="total-row">
                  <span>Taxa de Serviço</span>
                  <span>R$ {{ getServiceFee().toFixed(2) }}</span>
                </div>
                <div class="total-row grand-total">
                  <strong>Total</strong>
                  <strong>R$ {{ getTotal().toFixed(2) }}</strong>
                </div>
              </div>

              <!-- Informações do Restaurante -->
              <div class="restaurant-info">
                <h4>Restaurante Sabor</h4>
                <p>📍 Av. Principal, 1234 - Centro</p>
                <p>⏰ Entrega em 30-45 minutos</p>
                <p>📞 (11) 3333-4444</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal de Confirmação -->
        <div *ngIf="showSuccessModal" class="modal-overlay">
          <div class="modal">
            <div class="modal-content">
              <div class="modal-icon">✅</div>
              <h2>Pedido Confirmado!</h2>
              <p>Seu pedido #{{ orderNumber }} foi recebido com sucesso.</p>
              <p>Entregaremos em aproximadamente <strong>40 minutos</strong>.</p>
              <p>Um e-mail de confirmação foi enviado para <strong>{{ checkoutForm.value.email }}</strong>.</p>
              <div class="modal-actions">
                <button class="btn btn-primary" (click)="goToHome()">
                  Voltar para Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 2rem 0 4rem;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }

    .page-title {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 3rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .checkout-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }

    .form-section {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      background: #fcfcfc;
    }

    .form-section legend {
      font-weight: 600;
      color: #333;
      padding: 0 10px;
      font-size: 1.1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #d32f2f;
    }

    input.invalid, select.invalid {
      border-color: #ff4444;
    }

    .error-message {
      color: #ff4444;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .payment-option {
      border: 2px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .payment-option:hover {
      border-color: #d32f2f;
    }

    .payment-option input[type="radio"] {
      display: none;
    }

    .payment-option input[type="radio"]:checked + span {
      color: #d32f2f;
      font-weight: bold;
    }

    .payment-option input[type="radio"]:checked ~ .payment-option {
      border-color: #d32f2f;
      background: #ffebee;
    }

    .card-details {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .terms {
      padding: 1rem 0;
      border-top: 1px solid #eee;
    }

    .terms-link {
      color: #d32f2f;
      text-decoration: none;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .form-actions .btn {
      min-width: 150px;
    }

    .order-summary {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }

    .summary-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }

    .summary-card h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #333;
      border-bottom: 2px solid #d32f2f;
      padding-bottom: 0.75rem;
    }

    .order-items {
      margin-bottom: 2rem;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-name {
      color: #555;
    }

    .item-price {
      font-weight: 500;
    }

    .empty-order {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .order-totals {
      margin-top: 2rem;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: #666;
    }

    .grand-total {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid #eee;
      font-size: 1.2rem;
      color: #333;
    }

    .restaurant-info {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
      color: #666;
    }

    .restaurant-info h4 {
      color: #333;
      margin-bottom: 1rem;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .modal {
      background: white;
      border-radius: 15px;
      max-width: 500px;
      width: 90%;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-content {
      padding: 3rem;
      text-align: center;
    }

    .modal-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .modal h2 {
      color: #4CAF50;
      margin-bottom: 1rem;
    }

    .modal p {
      color: #666;
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }

    .modal-actions {
      margin-top: 2rem;
    }

    @media (max-width: 1200px) {
      .checkout-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .order-summary {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .checkout-form {
        padding: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .payment-methods {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  items: CartItem[] = [];
  isSubmitting = false;
  showSuccessModal = false;
  orderNumber = '';
  deliveryFee = 8.90;

  estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.createForm();
  }

  ngOnInit() {
    this.loadCartItems();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Dados pessoais
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],

      // Endereço
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],

      // Pagamento
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      cardExpiry: [''],
      cardCVC: [''],

      // Observações
      notes: [''],

      // Termos
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.items = items;
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  showCardFields(): boolean {
    const method = this.checkoutForm.get('paymentMethod')?.value;
    return method === 'credit-card' || method === 'debit-card';
  }

  buscarCEP() {
    const cep = this.checkoutForm.get('cep')?.value.replace(/\D/g, '');

    if (cep.length === 8) {
      // Simulação de busca de CEP
      // Em um projeto real, você usaria uma API como ViaCEP
      console.log('Buscando CEP:', cep);
    }
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.dish.price * item.quantity),
      0
    );
  }

  getServiceFee(): number {
    return this.getSubtotal() * 0.10;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getServiceFee() + this.deliveryFee;
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.items.length === 0) {
      // Marcar todos os campos como tocados para mostrar erros
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const control = this.checkoutForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simular processamento do pedido
    setTimeout(() => {
      // Gerar número de pedido aleatório
      this.orderNumber = 'ORD' + Math.floor(Math.random() * 1000000);

      // Limpar carrinho
      this.cartService.clearCart();

      // Mostrar modal de sucesso
      this.showSuccessModal = true;
      this.isSubmitting = false;
    }, 2000);
  }

  goToHome() {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
    this.checkoutForm.reset();
  }
}
