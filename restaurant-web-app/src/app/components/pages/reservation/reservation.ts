import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Reserva } from '../../../models/dish';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.scss']
})
export class ReservationComponent implements OnInit {
  // Formulário de reserva
  reservaForm: FormGroup;

  // Estados
  carregando = false;
  reservaRealizada = false;
  verificandoDisponibilidade = false;
  horarioDisponivel = true;

  // Dados da reserva
  reservaConfirmada: Reserva | null = null;
  numeroReserva = '';

  // Opções
  horariosDisponiveis: string[] = [];
  diasDaSemana: string[] = [];

  // Número mínimo e máximo de pessoas
  minPessoas = 1;
  maxPessoas = 12;
  reservationService: any;

  constructor(
    private fb: FormBuilder
  ) {
    // Inicializar formulário
    this.reservaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      numeroPessoas: [2, [Validators.required, Validators.min(this.minPessoas), Validators.max(this.maxPessoas)]],
      observacoes: ['']
    });
  }

  ngOnInit() {
    // Carregar opções
    this.horariosDisponiveis = this.reservationService.getHorariosDisponiveis();
    this.diasDaSemana = this.reservationService.getDiasDaSemana();

    // Configurar data mínima (hoje)
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0];
    this.reservaForm.get('data')?.setValue(dataMinima);

    // Configurar hora padrão (primeiro horário disponível)
    if (this.horariosDisponiveis.length > 0) {
      this.reservaForm.get('hora')?.setValue(this.horariosDisponiveis[0]);
    }

    // Verificar disponibilidade quando data ou hora mudarem
    this.reservaForm.get('data')?.valueChanges.subscribe(() => this.verificarDisponibilidade());
    this.reservaForm.get('hora')?.valueChanges.subscribe(() => this.verificarDisponibilidade());
    this.reservaForm.get('numeroPessoas')?.valueChanges.subscribe(() => this.verificarDisponibilidade());
  }

  // Verificar disponibilidade do horário
  verificarDisponibilidade() {
    const data = this.reservaForm.get('data')?.value;
    const hora = this.reservaForm.get('hora')?.value;
    const numeroPessoas = this.reservaForm.get('numeroPessoas')?.value;

    if (data && hora && numeroPessoas) {
      this.verificandoDisponibilidade = true;

      this.reservationService.verificarDisponibilidade(
        new Date(data),
        hora,
        numeroPessoas
      ).subscribe({
        next: (disponivel: boolean) => {
          this.horarioDisponivel = disponivel;
          this.verificandoDisponibilidade = false;
        },
        error: (erro: any) => {
          console.error('Erro ao verificar disponibilidade:', erro);
          this.horarioDisponivel = true; // Em caso de erro, assume disponível
          this.verificandoDisponibilidade = false;
        }
      });
    }
  }

  // Formatar data para exibição
  formatarData(dataString: string): string {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const diaSemana = this.diasDaSemana[data.getDay()];

    return `${diaSemana}, ${dia}/${mes}/${ano}`;
  }

  // Formatar hora para exibição
  formatarHora(hora: string): string {
    return hora.replace(':', 'h');
  }

  // Enviar reserva
  enviarReserva() {
    if (this.reservaForm.invalid || !this.horarioDisponivel) {
      this.marcarFormularioComoModificado();
      return;
    }

    this.carregando = true;

    const dadosReserva: Reserva = {
      ...this.reservaForm.value,
      data: new Date(this.reservaForm.get('data')?.value),
      hora: this.reservaForm.get('hora')?.value
    };

    this.reservationService.criarReserva(dadosReserva).subscribe({
      next: (reserva: Reserva) => {
        this.reservaConfirmada = reserva;
        this.numeroReserva = reserva.id || '';
        this.reservaRealizada = true;
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao criar reserva:', erro);
        this.carregando = false;
        alert('Erro ao realizar reserva. Por favor, tente novamente.');
      }
    });
  }

  // Fazer nova reserva
  fazerNovaReserva() {
    this.reservaRealizada = false;
    this.reservaConfirmada = null;

    // Resetar formulário
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0];

    this.reservaForm.reset({
      data: dataMinima,
      hora: this.horariosDisponiveis[0],
      numeroPessoas: 2
    });

    this.horarioDisponivel = true;
  }

  // Incrementar número de pessoas
  incrementarPessoas() {
    const current = this.reservaForm.get('numeroPessoas')?.value;
    if (current < this.maxPessoas) {
      this.reservaForm.get('numeroPessoas')?.setValue(current + 1);
    }
  }

  // Decrementar número de pessoas
  decrementarPessoas() {
    const current = this.reservaForm.get('numeroPessoas')?.value;
    if (current > this.minPessoas) {
      this.reservaForm.get('numeroPessoas')?.setValue(current - 1);
    }
  }

  // Obter horários alternativos
  getHorariosAlternativos(): string[] {
    const horaSelecionada = this.reservaForm.get('hora')?.value;
    if (!horaSelecionada) return [];

    const index = this.horariosDisponiveis.indexOf(horaSelecionada);
    const alternativas = [];

    // Horários antes
    for (let i = Math.max(0, index - 2); i < index; i++) {
      alternativas.push(this.horariosDisponiveis[i]);
    }

    // Horários depois
    for (let i = index + 1; i <= Math.min(this.horariosDisponiveis.length - 1, index + 2); i++) {
      alternativas.push(this.horariosDisponiveis[i]);
    }

    return alternativas.slice(0, 3); // Retorna até 3 alternativas
  }

  // Selecionar horário alternativo
  selecionarHorarioAlternativo(hora: string) {
    this.reservaForm.get('hora')?.setValue(hora);
  }

  // Helper para marcar todos os campos como modificados
  private marcarFormularioComoModificado() {
    Object.keys(this.reservaForm.controls).forEach(key => {
      this.reservaForm.get(key)?.markAsTouched();
    });
  }

  // Getters para validação
  get f() {
    return this.reservaForm.controls;
  }

  // Verificar se data é hoje
  get dataEhHoje(): boolean {
    const dataSelecionada = new Date(this.reservaForm.get('data')?.value);
    const hoje = new Date();

    return dataSelecionada.toDateString() === hoje.toDateString();
  }

  // Verificar se data é fim de semana
  get dataEhFimDeSemana(): boolean {
    const dataSelecionada = new Date(this.reservaForm.get('data')?.value);
    const diaDaSemana = dataSelecionada.getDay();

    return diaDaSemana === 0 || diaDaSemana === 6; // 0 = Domingo, 6 = Sábado
  }

  // Getter para data mínima (hoje)
  get dataMinima(): string {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  }

  // Getter para data máxima (3 meses à frente)
  get dataMaxima(): string {
    const hoje = new Date();
    const tresMeses = new Date(hoje.setMonth(hoje.getMonth() + 3));
    return tresMeses.toISOString().split('T')[0];
  }
}
