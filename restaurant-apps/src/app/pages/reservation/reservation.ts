import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="reservation-page">
      <div class="container">
        <h1 class="page-title">Reservar Mesa</h1>

        <div class="reservation-content">
          <div class="reservation-form">
            <form [formGroup]="reservationForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  [class.invalid]="isFieldInvalid('name')"
                  placeholder="Seu nome">
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

              <div class="form-row">
                <div class="form-group">
                  <label for="date">Data *</label>
                  <input
                    type="date"
                    id="date"
                    formControlName="date"
                    [class.invalid]="isFieldInvalid('date')"
                    [min]="minDate"
                    [max]="maxDate">
                  <div *ngIf="isFieldInvalid('date')" class="error-message">
                    Data inválida
                  </div>
                </div>

                <div class="form-group">
                  <label for="time">Horário *</label>
                  <select
                    id="time"
                    formControlName="time"
                    [class.invalid]="isFieldInvalid('time')">
                    <option value="">Selecione</option>
                    <option *ngFor="let time of availableTimes" [value]="time">
                      {{ time }}
                    </option>
                  </select>
                  <div *ngIf="isFieldInvalid('time')" class="error-message">
                    Selecione um horário
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="guests">Número de Pessoas *</label>
                <select
                  id="guests"
                  formControlName="guests"
                  [class.invalid]="isFieldInvalid('guests')">
                  <option value="">Selecione</option>
                  <option *ngFor="let num of [1,2,3,4,5,6,7,8]" [value]="num">
                    {{ num }} pessoa{{ num > 1 ? 's' : '' }}
                  </option>
                </select>
                <div *ngIf="isFieldInvalid('guests')" class="error-message">
                  Selecione o número de pessoas
                </div>
              </div>

              <div class="form-group">
                <label for="specialRequests">Pedidos Especiais</label>
                <textarea
                  id="specialRequests"
                  formControlName="specialRequests"
                  rows="3"
                  placeholder="Alergias, aniversariante, etc."></textarea>
              </div>

              <div class="form-actions">
                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="reservationForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Confirmar Reserva</span>
                  <span *ngIf="isSubmitting">Processando...</span>
                </button>
              </div>
            </form>
          </div>

          <div class="reservation-info">
            <div class="info-card">
              <h3>Informações Importantes</h3>
              <ul>
                <li>✅ Reservas com até 1 hora de antecedência</li>
                <li>⏰ Horário máximo para reserva: 22:00</li>
                <li>👥 Máximo de 8 pessoas por reserva</li>
                <li>📞 Cancelamentos com até 2 horas de antecedência</li>
                <li>🎂 Aniversariantes ganham uma sobremesa especial</li>
              </ul>

              <div class="contact-info">
                <h4>Dúvidas?</h4>
                <p>📞 (11) 3333-4444</p>
                <p>✉️ reservas@restaurantesabor.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal de Confirmação -->
        <div *ngIf="showSuccessModal" class="modal-overlay">
          <div class="modal">
            <div class="modal-content">
              <div class="modal-icon">✅</div>
              <h2>Reserva Confirmada!</h2>
              <p>Sua reserva foi agendada para:</p>
              <p><strong>{{ reservationForm.value.date | date:'dd/MM/yyyy' }}</strong> às <strong>{{ reservationForm.value.time }}</strong></p>
              <p>Para <strong>{{ reservationForm.value.guests }} pessoa{{ reservationForm.value.guests > 1 ? 's' : '' }}</strong></p>
              <p>Nome: <strong>{{ reservationForm.value.name }}</strong></p>
              <p>Um e-mail de confirmação foi enviado para <strong>{{ reservationForm.value.email }}</strong>.</p>
              <div class="modal-actions">
                <button class="btn btn-primary" (click)="closeModal()">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reservation-page {
      padding: 2rem 0 4rem;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }

    .page-title {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .reservation-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 3rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .reservation-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
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

    .form-actions {
      text-align: center;
      margin-top: 2rem;
    }

    .form-actions .btn {
      min-width: 200px;
    }

    .reservation-info {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }

    .info-card h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #d32f2f;
      padding-bottom: 0.75rem;
    }

    .info-card ul {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
    }

    .info-card li {
      padding: 0.5rem 0;
      color: #666;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-info {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .contact-info h4 {
      color: #333;
      margin-bottom: 1rem;
    }

    .contact-info p {
      color: #666;
      margin: 0.5rem 0;
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

    @media (max-width: 992px) {
      .reservation-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .reservation-info {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .reservation-form {
        padding: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ReservationComponent {
  reservationForm: FormGroup;
  isSubmitting = false;
  showSuccessModal = false;

  // Horários disponíveis para reserva
  availableTimes = [
    '11:30', '12:00', '12:30', '13:00', '13:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  // Datas mínima e máxima para reserva (hoje até 30 dias à frente)
  minDate: string;
  maxDate: string;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = maxDate.toISOString().split('T')[0];

    this.reservationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      guests: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      specialRequests: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reservationForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.reservationForm.invalid) {
      // Marcar todos os campos como tocados para mostrar erros
      Object.keys(this.reservationForm.controls).forEach(key => {
        const control = this.reservationForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simular processamento da reserva
    setTimeout(() => {
      this.showSuccessModal = true;
      this.isSubmitting = false;
    }, 1500);
  }

  closeModal() {
    this.showSuccessModal = false;
    this.reservationForm.reset();
  }
}
