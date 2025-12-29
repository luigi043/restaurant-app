import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, stagger, query, keyframes } from '@angular/animations';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerItems', [
      transition(':enter', [
        query('.feature-item, .hero-action', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('pulseIcon', [
      transition(':enter', [
        animate('2s ease-in-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  // Horário de funcionamento
  horarioFuncionamento = {
    dias: 'Terça a Domingo',
    horario: '18:00 - 23:00',
    telefone: '(11) 9999-9999',
    endereco: 'Via Roma, 123 - Centro Histórico'
  };

  // Características do restaurante
  caracteristicas = [
    {
      icone: '🇮🇹',
      texto: 'Culinária Italiana Autêntica',
      descricao: 'Receitas tradicionais passadas por gerações'
    },
    {
      icone: '🍝',
      texto: 'Massas Feitas na Hora',
      descricao: 'Frescor e sabor incomparáveis'
    },
    {
      icone: '🍷',
      texto: 'Adega Exclusiva',
      descricao: 'Mais de 200 rótulos italianos'
    },
    {
      icone: '👨‍🍳',
      texto: 'Chef Estrelado',
      descricao: 'Chef Mario Rossi - 20 anos de experiência'
    },
    {
      icone: '🌿',
      texto: 'Ingredientes Frescos',
      descricao: 'Produtos locais e importados da Itália'
    },
    {
      icone: '🎵',
      texto: 'Música Ao Vivo',
      descricao: 'Serenatas italianas às sextas e sábados'
    }
  ];

  // Estado do componente
  currentFeatureIndex = 0;
  isFeatureHovered = false;
  showAllFeatures = false;
  private intervalId: any;

  // Textos dinâmicos para o título
  dynamicTitles = [
    'Autenticidade Italiana',
    'Sabores da Nonna',
    'Experiência Gastronômica',
    'Tradição & Sabor'
  ];
  currentTitleIndex = 0;
  titleDisplay = '';

  ngOnInit() {
    this.startTitleAnimation();
    this.startFeatureCarousel();
    this.typeWriterEffect();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Efeito máquina de escrever para o título
  private typeWriterEffect() {
    const title = this.dynamicTitles[this.currentTitleIndex];
    let i = 0;
    const speed = 100;

    const typeWriter = () => {
      if (i < title.length) {
        this.titleDisplay += title.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Aguarda e muda para o próximo título
        setTimeout(() => {
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.dynamicTitles.length;
          this.titleDisplay = '';
          this.typeWriterEffect();
        }, 3000);
      }
    };

    typeWriter();
  }

  // Animação de troca automática de títulos
  private startTitleAnimation() {
    setInterval(() => {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.dynamicTitles.length;
    }, 5000);
  }

  // Carrossel automático das características
  private startFeatureCarousel() {
    this.intervalId = setInterval(() => {
      if (!this.isFeatureHovered && !this.showAllFeatures) {
        this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.caracteristicas.length;
      }
    }, 4000);
  }

  // Métodos de interação
  onFeatureHover(index: number) {
    this.isFeatureHovered = true;
    this.currentFeatureIndex = index;
  }

  onFeatureLeave() {
    this.isFeatureHovered = false;
  }

  toggleFeatures() {
    this.showAllFeatures = !this.showAllFeatures;
  }

  get visibleFeatures() {
    return this.showAllFeatures
      ? this.caracteristicas
      : this.caracteristicas.slice(0, 4);
  }

  get currentFeature() {
    return this.caracteristicas[this.currentFeatureIndex];
  }

  // Método para formatação de telefone
  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  // Método para obter o status atual (aberto/fechado)
  get statusAberto(): { status: string; icone: string; cor: string } {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, etc.

    // Verifica se está aberto (Terça a Domingo, 18:00-23:00)
    const isDiaFuncionamento = diaSemana >= 2 && diaSemana <= 6; // Terça (2) a Sábado (6)
    const isDomingo = diaSemana === 0; // Domingo
    const isHorarioFuncionamento = horaAtual >= 18 && horaAtual < 23;

    if ((isDiaFuncionamento || isDomingo) && isHorarioFuncionamento) {
      return {
        status: 'Aberto Agora',
        icone: '🟢',
        cor: '#36b37e'
      };
    } else {
      return {
        status: 'Fechado',
        icone: '🔴',
        cor: '#ff5630'
      };
    }
  }

  // Método para calcular tempo até abertura
  get tempoAteAbertura(): string {
    const agora = new Date();
    const horaAtual = agora.getHours();

    if (horaAtual < 18) {
      const horasRestantes = 18 - horaAtual;
      return `Abre em ${horasRestantes} ${horasRestantes === 1 ? 'hora' : 'horas'}`;
    } else {
      return 'Amanhã às 18:00';
    }
  }

  // Método para rolar suavemente para uma seção
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Método para obter a saudação baseada no horário
  get saudacao(): string {
    const hora = new Date().getHours();

    if (hora < 12) return 'Buongiorno!';
    if (hora < 18) return 'Buon pomeriggio!';
    return 'Buonasera!';
  }
}
